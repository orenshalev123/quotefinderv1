
import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'

export default defineConfig({
  name: 'quotefinder-studio',
  title: 'QuoteFinder Content Studio',
  
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  
  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
