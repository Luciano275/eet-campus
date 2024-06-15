export default function Wallpaper() {
    return (
        <div className="absolute top-0 left-0 -z-50 w-full h-screen overflow-hidden" style={{
            backgroundImage: 'url(/wp.jpg)',
            backgroundAttachment: 'fixed',
            backgroundSize: 'cover'
        }}>
            <div className="absolute top-0 left-0 w-full h-full -z-0 bg-black backdrop-blur-xl bg-opacity-70"></div>
        </div>
    )
}