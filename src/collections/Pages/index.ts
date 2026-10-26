import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { Archive } from '../../blocks/ArchiveBlock/config'
import { CallToAction } from '../../blocks/CallToAction/config'
import { Content } from '../../blocks/Content/config'
import { FormBlock } from '../../blocks/Form/config'
import { MediaBlock } from '../../blocks/MediaBlock/config'
import { hero } from '@/heros/config'
import { slugField } from 'payload'
import { populatePublishedAt } from '../../hooks/populatePublishedAt'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { revalidateDelete, revalidatePage } from './hooks/revalidatePage'

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

export const Pages: CollectionConfig<'pages'> = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a page is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
  defaultPopulate: {
    title: true,
    slug: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) =>
        generatePreviewPath({
          slug: data?.slug,
          collection: 'pages',
          req,
        }),
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: data?.slug as string,
        collection: 'pages',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'topicOrder',
      type: 'number',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      admin: {
        position: 'sidebar',
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          fields: [hero],
          label: 'Hero',
        },
        {
          fields: [
            {
              name: 'topicSections',
              type: 'array',
              label: 'Guide Sections',
              admin: {
                initCollapsed: true,
              },
              fields: [
                {
                  name: 'heading',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'lessonSlug',
                  type: 'text',
                  admin: {
                    description: 'Optional URL part for the individual lesson page.',
                  },
                },
                {
                  name: 'body',
                  type: 'textarea',
                  required: true,
                },
                {
                  name: 'description',
                  type: 'textarea',
                  admin: {
                    description: 'A short preview shown before the lesson is opened.',
                  },
                },
                {
                  name: 'content',
                  type: 'richText',
                  editor: lexicalEditor(),
                  admin: {
                    description: 'Optional formatted lesson content with links and lists.',
                  },
                },
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                },
                {
                  name: 'videoUrl',
                  type: 'text',
                  admin: {
                    description: 'Direct video URL or a YouTube/Vimeo link.',
                  },
                },
                {
                  name: 'videoTitle',
                  type: 'text',
                  admin: {
                    description: 'Optional title displayed below the video.',
                  },
                },
                {
                  name: 'codeExamples',
                  type: 'array',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'language',
                      type: 'select',
                      defaultValue: 'bash',
                      options: [
                        { label: 'Bash', value: 'bash' },
                        { label: 'TSX', value: 'tsx' },
                        { label: 'TypeScript', value: 'typescript' },
                        { label: 'JavaScript', value: 'javascript' },
                        { label: 'JSON', value: 'json' },
                        { label: 'C++', value: 'cpp' },
                        { label: 'Python', value: 'python' },
                        { label: 'Text', value: 'text' },
                      ],
                    },
                    {
                      name: 'code',
                      type: 'textarea',
                      required: true,
                      admin: {
                        rows: 10,
                      },
                    },
                  ],
                },
                {
                  name: 'steps',
                  type: 'array',
                  label: 'Step-by-step',
                  admin: {
                    initCollapsed: true,
                  },
                  fields: [
                    {
                      name: 'title',
                      type: 'text',
                      required: true,
                    },
                    {
                      name: 'details',
                      type: 'textarea',
                      required: true,
                    },
                  ],
                },
              ],
            },
            {
              name: 'layout',
              type: 'blocks',
              blocks: [CallToAction, Content, MediaBlock, Archive, FormBlock],
              required: false,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: 'Content',
        },
        {
          name: 'meta',
          label: 'SEO',
          fields: [
            OverviewField({
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
              imagePath: 'meta.image',
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: 'media',
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: 'meta.title',
              descriptionPath: 'meta.description',
            }),
          ],
        },
      ],
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
