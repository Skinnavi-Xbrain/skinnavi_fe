import type { RoutineDetailResponse } from '../types'

export const mockRoutineDetail: RoutineDetailResponse = {
  statusCode: 200,
  success: true,
  data: {
    id: '541ee7fe-4630-4c38-9625-0f418e6070cc',
    user_routine_id: '03aede06-6d2d-43dd-b710-2cebf4bacd72',
    step_order: 1,
    instruction:
      'Cleanse Your Skin: Gently massage a small amount of cleanser onto damp skin, then rinse thoroughly with lukewarm water.',
    product_id: '3150b471-98b0-4f04-83a2-c673c3ee35bb',
    sub_steps: [
      {
        id: 'sub-1-1',
        order: 1,
        instruction: 'Wet your face with lukewarm water.',
        description:
          'Use lukewarm water to avoid shocking your skin; splash gently and ensure full coverage.'
      },
      {
        id: 'sub-1-2',
        order: 2,
        instruction: 'Apply cleanser and massage for 30 seconds.',
        description:
          'Dispense a dime-sized amount, spread evenly, and use circular motions on forehead, cheeks, and chin.'
      },
      {
        id: 'sub-1-3',
        order: 3,
        instruction: 'Rinse and pat dry with a towel.',
        description:
          'Rinse thoroughly until no bubbles remain and pat—don’t rub—to avoid irritation.'
      }
    ],
    product: {
      id: '3150b471-98b0-4f04-83a2-c673c3ee35bb',
      name: 'Centella Foaming Facial Cleanser',
      usage_role: 'Cleanser',
      display_price: '120000',
      affiliate_url: 'https://example.com/product/cleanser',
      image_url: 'https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1h1aoscu82baa.webp',
      is_active: true
    }
  }
}
