import { execSync, spawn } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ffmpegPath = require('ffmpeg-static')
const __dirname = dirname(fileURLToPath(import.meta.url))

const VIDEO_PATH = join(__dirname, '..', 'public', 'videos', 'ice_lm.mp4')
const FRAMES_DIR = join(__dirname, '..', 'public', 'frames')
const TARGET_FRAMES = 180   // sweet spot: smooth scrubbing, manageable file count
const WEBP_QUALITY = 78     // 0-100, higher = better quality but larger files

// Create output directory
if (!existsSync(FRAMES_DIR)) {
    mkdirSync(FRAMES_DIR, { recursive: true })
    console.log('Created /public/frames/')
}

// Get video duration
function getVideoDuration() {
    const result = execSync(
        `"${ffmpegPath}" -i "${VIDEO_PATH}" 2>&1`,
        { encoding: 'utf8', stdio: 'pipe' }
    ).toString()
    const match = result.match(/Duration: (\d+):(\d+):(\d+\.\d+)/)
    if (!match) throw new Error('Could not read video duration')
    const [, h, m, s] = match
    return parseFloat(h) * 3600 + parseFloat(m) * 60 + parseFloat(s)
}

// Get video resolution
function getVideoInfo() {
    try {
        const result = execSync(
            `"${ffmpegPath}" -i "${VIDEO_PATH}" 2>&1`,
            { encoding: 'utf8', stdio: 'pipe' }
        ).toString()
        const dur = result.match(/Duration: (\d+):(\d+):(\d+\.\d+)/)
        const res = result.match(/(\d{3,4})x(\d{3,4})/)
        const fps = result.match(/(\d+(?:\.\d+)?) fps/)
        return {
            duration: dur ? parseFloat(dur[1]) * 3600 + parseFloat(dur[2]) * 60 + parseFloat(dur[3]) : 0,
            width: res ? parseInt(res[1]) : 1080,
            height: res ? parseInt(res[2]) : 1920,
            nativeFps: fps ? parseFloat(fps[1]) : 30,
        }
    } catch (e) {
        // ffmpeg always exits non-zero for -i alone, parse stderr
        const out = e.stdout?.toString() + e.stderr?.toString() || e.message
        const dur = out.match(/Duration: (\d+):(\d+):(\d+\.\d+)/)
        const res = out.match(/(\d{3,4})x(\d{3,4})/)
        const fps = out.match(/(\d+(?:\.\d+)?) fps/)
        return {
            duration: dur ? parseFloat(dur[1]) * 3600 + parseFloat(dur[2]) * 60 + parseFloat(dur[3]) : 30,
            width: res ? parseInt(res[1]) : 1080,
            height: res ? parseInt(res[2]) : 1920,
            nativeFps: fps ? parseFloat(fps[1]) : 30,
        }
    }
}

async function extractFrames() {
    console.log('\n🎬 Lindermedia Iceberg — Frame Extractor\n')
    console.log(`Video: ${VIDEO_PATH}`)

    const info = getVideoInfo()
    console.log(`Duration: ${info.duration.toFixed(2)}s`)
    console.log(`Resolution: ${info.width}x${info.height}`)
    console.log(`Native FPS: ${info.nativeFps}`)

    const targetFps = TARGET_FRAMES / info.duration
    console.log(`\nExtracting ${TARGET_FRAMES} frames at ${targetFps.toFixed(2)} fps...`)

    // Scale: keep 9:16 ratio, max width 960px (retina: displayed at ~480px)
    const outputWidth = 960
    const outputHeight = Math.round(outputWidth * (info.height / info.width))

    const args = [
        '-i', VIDEO_PATH,
        '-vf', `fps=${targetFps.toFixed(4)},scale=${outputWidth}:${outputHeight}:flags=lanczos`,
        '-c:v', 'libwebp',
        '-quality', String(WEBP_QUALITY),
        '-compression_level', '4',
        '-an',
        join(FRAMES_DIR, 'frame_%04d.webp'),
    ]

    return new Promise((resolve, reject) => {
        const proc = spawn(ffmpegPath, args)
        let lastLine = ''

        proc.stderr.on('data', (data) => {
            const line = data.toString()
            // Show progress line
            if (line.includes('frame=')) {
                const match = line.match(/frame=\s*(\d+)/)
                if (match) {
                    process.stdout.write(`\r  Extracting frame ${match[1]}/${TARGET_FRAMES}...`)
                    lastLine = line
                }
            }
        })

        proc.on('close', (code) => {
            if (code === 0) {
                console.log('\n\n✅ Done!\n')
                console.log(`Frames saved to: public/frames/`)
                console.log(`Total frames: ${TARGET_FRAMES}`)
                console.log(`\n📋 Add this to your canvas component:`)
                console.log(`   const TOTAL_FRAMES = ${TARGET_FRAMES}`)
                resolve()
            } else {
                reject(new Error(`FFmpeg exited with code ${code}`))
            }
        })

        proc.on('error', reject)
    })
}

extractFrames().catch((err) => {
    console.error('\n❌ Error:', err.message)
    process.exit(1)
})
