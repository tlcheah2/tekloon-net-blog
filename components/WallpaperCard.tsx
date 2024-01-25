import Link from 'next/link'
import Image from './Image'

type WallpaperCardProps = {
  title: string
  description: string
  imgSrc: string
  desktopHref: string
  phoneHref: string
}

const WallpaperCard = ({
  title,
  description,
  imgSrc,
  desktopHref,
  phoneHref,
}: WallpaperCardProps) => {
  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        }  overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}
      >
        <Image
          alt={title}
          src={imgSrc}
          className="object-cover object-center md:h-36 lg:h-48"
          width={544}
          height={306}
        />
        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
          <div className="flex flex-col">
            <Link href={desktopHref} download={`${title}-desktop`} target="_blank">
              <button className="w-full rounded-[15px] bg-yellow-500">Get Desktop Version</button>
            </Link>
            <Link href={phoneHref} download={`${title}-phone`} target="_blank">
              <button className=" mt-4 w-full rounded-[15px] bg-purple-500">
                Get Phone Version
              </button>
            </Link>
          </div>

          {/* {href && (
          <Link
            href={href}
            className="text-base font-medium leading-6 text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label={`Link to ${title}`}
          >
            Learn more &rarr;
          </Link>
        )} */}
        </div>
      </div>
    </div>
  )
}

export default WallpaperCard
