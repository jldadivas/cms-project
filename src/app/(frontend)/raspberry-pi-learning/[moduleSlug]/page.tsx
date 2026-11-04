import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { RaspberryPiModuleLesson } from '@/components/RaspberryPiLearning/ModuleLesson'
import { raspberryPiCourseModules } from '@/data/raspberry-pi-course-data'

type ModulePageProps = {
  params: Promise<{ moduleSlug: string }>
}

export default async function RaspberryPiModulePage({ params }: ModulePageProps) {
  const { moduleSlug } = await params
  const moduleIndex = raspberryPiCourseModules.findIndex((item) => item.slug === moduleSlug)
  if (moduleIndex === -1) notFound()

  return (
    <div className="min-h-screen bg-[#07121f] px-4 py-6 text-[#e6f0fa] sm:px-6 lg:py-8">
      <main className="mx-auto max-w-5xl">
        <RaspberryPiModuleLesson
          module={raspberryPiCourseModules[moduleIndex]}
          nextModule={raspberryPiCourseModules[moduleIndex + 1] ?? null}
          previousModule={raspberryPiCourseModules[moduleIndex - 1] ?? null}
        />
      </main>
    </div>
  )
}

export async function generateStaticParams() {
  return raspberryPiCourseModules.map((module) => ({ moduleSlug: module.slug }))
}

export async function generateMetadata({ params }: ModulePageProps): Promise<Metadata> {
  const { moduleSlug } = await params
  const module = raspberryPiCourseModules.find((item) => item.slug === moduleSlug)
  if (!module) return { title: 'Lesson Not Found | Raspberry Pi Learning Center' }

  return {
    title: `${module.title} | Raspberry Pi Learning Center`,
    description: module.description,
  }
}
