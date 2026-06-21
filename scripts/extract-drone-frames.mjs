import { execSync, spawn } from 'child_process'
import { mkdirSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createRequire } from 'module'

const require = createRequire(import.meta.url)
const ffmpegPath = require('ffmpeg-static')
const __dirname = dirname(fileURLToPath(import.meta.url))

const VIDEO_PATH  = join(__dirname, '..', 'public', 'videos', 'drone.mp4')
const FRAMES_DIR  = join(__dirname, '..', 'public', 'drone-frames')
const TARGET_FRAMES = 150
const WEBP_QUALITY  = 80

if (!existsSync(FRAMES_DIR)) {
    mkdirSync(FRAMES_DIR, { recursive: true })
    console.log('Created /public/drone-frames/')
}

function getVideoInfo() {
    try {
        execSync(`"${ffmpegPath}" -i "${VIDEO_PATH}" 2>&1`, { encoding: 'utf8', stdio: 'pipe' })
    } catch (e) {
        const out = (e.stdout || '') + (e.stderr || '') + e.message
        const dur = out.match(/Duration: (\d+):(\d+):(\d+\.\d+)/)
        const res = out.match(/(\d{3,4})x(\d{3,4})/)
        return {
            duration: dur ? parseFloat(dur[1])*3600 + parseFloat(dur[2])*60 + parseFloat(dur[3]) : 10,
            width:  res ? parseInt(res[1]) : 1920,
            height: res ? parseInt(res[2]) : 1080,
        }
    }
}

async function extractFrames() {
    console.log('\n🚁 Drone Frame Extractor\n')
    const info = getVideoInfo()
    console.log(`Duration: ${info.duration.toFixed(2)}s  |  ${info.width}x${info.height}`)

    const targetFps = TARGET_FRAMES / info.duration
    const outW = 1280
    const outH = Math.round(outW * (info.height / info.width))

    console.log(`Extracting ${TARGET_FRAMES} frames at ${targetFps.toFixed(2)} fps → ${outW}x${outH}...\n`)

    const args = [
        '-i', VIDEO_PATH,
        '-vf', `fps=${targetFps.toFixed(4)},scale=${outW}:${outH}:flags=lanczos`,
        '-c:v', 'libwebp',
        '-quality', String(WEBP_QUALITY),
        '-compression_level', '4',
        '-an',
        join(FRAMES_DIR, 'frame_%04d.webp'),
    ]

    return new Promise((resolve, reject) => {
        const proc = spawn(ffmpegPath, args)
        proc.stderr.on('data', (data) => {
            const match = data.toString().match(/frame=\s*(\d+)/)
            if (match) process.stdout.write(`\r  Frame ${match[1]}/${TARGET_FRAMES}...`)
        })
        proc.on('close', (code) => {
            if (code === 0) {
                console.log(`\n\n✅ Done! ${TARGET_FRAMES} frames → public/drone-frames/`)
                console.log(`   const DRONE_FRAMES = ${TARGET_FRAMES}`)
                resolve()
            } else {
                reject(new Error(`FFmpeg exited with code ${code}`))
            }
        })
        proc.on('error', reject)
    })
}

extractFrames().catch((err) => {
    console.error('\n❌', err.message)
    process.exit(1)
})
