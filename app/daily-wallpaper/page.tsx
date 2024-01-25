import SectionContainer from '@/components/SectionContainer'
import WallpaperCard from '@/components/WallpaperCard'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Daily Wallpaper',
  description: 'Make Your Favourite Quotes become Your Device Wallpaper Here',
})

export default function DailyWallPaperPage() {
  return (
    <div>
      <SectionContainer>
        <h1 className="text-xl">
          Daily WallPaper started with the idea to turn some of my favourite quotes into Phone &
          Desktop Wallpaper.
        </h1>
        <div className="mt-4">
          Being able to look at them several times a day is a good reminder in life
        </div>
        <div>I hope you enjoy them as much as I do.</div>
      </SectionContainer>

      <h1 className="mt-8 text-2xl font-bold">Matte Black Series</h1>
      <WallpaperCard
        title={'Focus on what you control'}
        description={`There're only limited number of things you have complete control, focus on them and let go of the rest`}
        imgSrc={'/static/images/daily-wallpaper/focus-on-what you-can-control-sample.jpeg'}
        desktopHref={'https://i.imgur.com/T3V0HUH.jpg'}
        phoneHref={'https://i.imgur.com/1tz2KGa.jpg'}
      ></WallpaperCard>
    </div>
  )
}
