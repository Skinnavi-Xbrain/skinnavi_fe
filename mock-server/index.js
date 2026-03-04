import express from "express";
const app = express();
const port = process.env.PORT || 3001;

// prepare reusable routine data
const routineData = {
  morning: {
    id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    user_package_subscription_id: "bbee6063-7629-4f4a-b297-bd1e1c2e2473",
    routine_time: "MORNING",
    created_at: "2026-03-03T01:41:03.079Z",
    steps: [
      {
        id: "541ee7fe-4630-4c38-9625-0f418e6070cc",
        user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
        step_order: 1,
        instruction:
          "Cleanse Your Skin: Gently massage a small amount of cleanser onto damp skin, then rinse thoroughly with lukewarm water.",
        product_id: "3150b471-98b0-4f04-83a2-c673c3ee35bb",
        sub_steps: [
          {
            id: "sub-1-1",
            order: 1,
            instruction: "Wet your face with lukewarm water.",
            description:
              "Use lukewarm water to avoid shocking your skin; splash gently and ensure full coverage.",
          },
          {
            id: "sub-1-2",
            order: 2,
            instruction: "Apply cleanser and massage for 30 seconds.",
            description:
              "Dispense a dime-sized amount, spread evenly, and use circular motions on forehead, cheeks, and chin.",
          },
          {
            id: "sub-1-3",
            order: 3,
            instruction: "Rinse and pat dry with a towel.",
            description:
              "Rinse thoroughly until no bubbles remain and pat—don’t rub—to avoid irritation.",
          },
        ],
        product: {
          id: "3150b471-98b0-4f04-83a2-c673c3ee35bb",
          name: "Centella Foaming Facial Cleanser",
          usage_role: "Cleanser",
          display_price: "120000",
          affiliate_url: "https://example.com/product/cleanser",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1h1aoscu82baa.webp",
          is_active: true,
        },
      },
      {
        id: "cc1aecc1-baf6-4592-aec5-ff9cf34c6a0c",
        user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
        step_order: 2,
        instruction:
          "Balance and Hydrate: Apply toner to a cotton pad and gently swipe over your face and neck, or pat directly onto skin with clean hands.",
        product_id: "3d2ac50d-32f1-4ddd-b749-a51c254efba8",
        sub_steps: [
          {
            id: "sub-2-1",
            order: 1,
            instruction: "Soak a cotton pad with toner.",
            description:
              "Ensure the pad is damp but not dripping and covers the entire surface.",
          },
          {
            id: "sub-2-2",
            order: 2,
            instruction: "Gently swipe across face and neck.",
            description:
              "Move in upward strokes from jawline to forehead to help absorption.",
          },
        ],
        product: {
          id: "3d2ac50d-32f1-4ddd-b749-a51c254efba8",
          name: "Centella Active Hydrating Toner",
          usage_role: "Toner",
          display_price: "240000",
          affiliate_url: "https://example.com/product/toner",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwie1e35dsk954.webp",
          is_active: true,
        },
      },
      {
        id: "05f668c9-2d06-4c45-ab25-780de5a90cbc",
        user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
        step_order: 3,
        instruction:
          "Moisturize and Control Oil: Apply a pea-sized amount evenly to your face and neck, gently massaging until absorbed.",
        product_id: "3669426c-27f6-4075-894c-8de4b73d4291",
        sub_steps: [
          {
            id: "sub-3-1",
            order: 1,
            instruction: "Dispense moisturizer onto fingertips.",
            description:
              "Use a pea-sized amount and warm it between your fingers before application.",
          },
          {
            id: "sub-3-2",
            order: 2,
            instruction: "Spread evenly over face and neck.",
            description:
              "Gently massage in upward motions until fully absorbed, focusing on dry areas.",
          },
        ],
        product: {
          id: "3669426c-27f6-4075-894c-8de4b73d4291",
          name: "Centella Oil Control Facial Moisturizer",
          usage_role: "Moisturizer",
          display_price: "355000",
          affiliate_url: "https://example.com/product/moisturizer",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mha0hh4w47pma0.webp",
          is_active: true,
        },
      },
    ],
  },
  evening: {
    id: "eb9aeb02-7663-4c58-9146-244fb5fe5484",
    user_package_subscription_id: "bbee6063-7629-4f4a-b297-bd1e1c2e2473",
    routine_time: "EVENING",
    created_at: "2026-03-03T01:41:03.098Z",
    steps: [
      {
        id: "040c797d-0806-41f8-ad00-a7a0da92114b",
        user_routine_id: "eb9aeb02-7663-4c58-9146-244fb5fe5484",
        step_order: 1,
        instruction:
          "Remove Makeup and Impurities: Soak a cotton pad with micellar water and gently wipe across your face, eyes, and lips to remove makeup and impurities. No rinsing required for this step.",
        product_id: "546a96c4-24c5-46a0-a6c7-cacdcca82992",
        product: {
          id: "546a96c4-24c5-46a0-a6c7-cacdcca82992",
          name: "Centella Micellar Cleansing Water",
          usage_role: "Cleanser",
          display_price: "140000",
          affiliate_url: "https://example.com/product/micellar",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwie1e35t8m34a@resize_w900_nl.webp",
          is_active: true,
        },
      },
      {
        id: "5a87bc7f-5ce4-4832-99c1-236d2ac0fad1",
        user_routine_id: "eb9aeb02-7663-4c58-9146-244fb5fe5484",
        step_order: 2,
        instruction:
          "Deep Cleanse: Follow with a foaming cleanser. Lather a small amount with water and massage onto damp skin, then rinse thoroughly with lukewarm water.",
        product_id: "3150b471-98b0-4f04-83a2-c673c3ee35bb",
        product: {
          id: "3150b471-98b0-4f04-83a2-c673c3ee35bb",
          name: "Centella Foaming Facial Cleanser",
          usage_role: "Cleanser",
          display_price: "120000",
          affiliate_url: "https://example.com/product/cleanser",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7ras8-m1h1aoscu82baa.webp",
          is_active: true,
        },
      },
      {
        id: "88e5685a-c6f5-4d00-86c5-3da32981d111",
        user_routine_id: "eb9aeb02-7663-4c58-9146-244fb5fe5484",
        step_order: 3,
        instruction:
          "Balance and Prepare: Apply toner to a cotton pad and gently swipe over your face and neck, or pat directly onto skin with clean hands.",
        product_id: "3d2ac50d-32f1-4ddd-b749-a51c254efba8",
        product: {
          id: "3d2ac50d-32f1-4ddd-b749-a51c254efba8",
          name: "Centella Active Hydrating Toner",
          usage_role: "Toner",
          display_price: "240000",
          affiliate_url: "https://example.com/product/toner",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-7r98o-lwie1e35dsk954.webp",
          is_active: true,
        },
      },
      {
        id: "02418587-63df-41a1-9936-808d08bf68f0",
        user_routine_id: "eb9aeb02-7663-4c58-9146-244fb5fe5484",
        step_order: 4,
        instruction:
          "Hydrate and Control Oil Overnight: Apply a pea-sized amount evenly to your face and neck, gently massaging until absorbed.",
        product_id: "3669426c-27f6-4075-894c-8de4b73d4291",
        product: {
          id: "3669426c-27f6-4075-894c-8de4b73d4291",
          name: "Centella Oil Control Facial Moisturizer",
          usage_role: "Moisturizer",
          display_price: "355000",
          affiliate_url: "https://example.com/product/moisturizer",
          image_url:
            "https://down-vn.img.susercontent.com/file/vn-11134207-820l4-mha0hh4w47pma0.webp",
          is_active: true,
        },
      },
    ],
  },
};

// mock daily routine logs - past 7 days
const dailyLogsData = [
  {
    id: "log-2026-02-25",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-02-25",
    is_completed: false,
    created_at: "2026-02-25T10:30:00Z",
  },
  {
    id: "log-2026-02-26",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-02-26",
    is_completed: true,
    created_at: "2026-02-26T08:15:00Z",
  },
  {
    id: "log-2026-02-27",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-02-27",
    is_completed: true,
    created_at: "2026-02-27T09:00:00Z",
  },
  {
    id: "log-2026-02-28",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-02-28",
    is_completed: true,
    created_at: "2026-02-28T07:45:00Z",
  },
  {
    id: "log-2026-03-01",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-03-01",
    is_completed: false,
    created_at: "2026-03-01T22:00:00Z",
  },
  {
    id: "log-2026-03-02",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-03-02",
    is_completed: true,
    created_at: "2026-03-02T08:30:00Z",
  },
  {
    id: "log-2026-03-03",
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date: "2026-03-03",
    is_completed: true,
    created_at: "2026-03-03T08:00:00Z",
  },
];

// mock skin analysis metrics comparing previous vs current
const skinAnalysisData = {
  previous: {
    date: "2026-02-24",
    moistureLevel: 62,
    oilLevel: 45,
    acneCount: 8,
    rednessLevel: 35,
    texture: "rough",
  },
  current: {
    date: "2026-03-03",
    moistureLevel: 78,
    oilLevel: 38,
    acneCount: 4,
    rednessLevel: 18,
    texture: "smooth",
  },
};

// realistic hard-coded response derived from the analysis output
app.get("/api/routines", (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: "Get routine by user",
    data: {
      morning: routineData.morning,
      evening: routineData.evening,
    },
  });
});

// endpoint for retrieving a single routine step by id
app.get("/api/routines/steps/:stepId", (req, res) => {
  const { stepId } = req.params;
  const allSteps = [...routineData.morning.steps, ...routineData.evening.steps];
  const step = allSteps.find((s) => s.id === stepId);
  if (step) {
    return res.json({ statusCode: 200, success: true, data: step });
  }
  return res
    .status(404)
    .json({ statusCode: 404, success: false, message: "Step not found" });
});

// endpoint for retrieving daily routine logs (completion history)
app.get("/api/routine-daily-logs", (req, res) => {
  res.json({
    statusCode: 200,
    success: true,
    message: "Get daily routine logs",
    data: dailyLogsData,
  });
});

// endpoint for retrieving skin analysis comparison (current vs previous)
app.get("/api/skin-analysis/comparison", (req, res) => {
  const improvement = {
    moisture:
      ((skinAnalysisData.current.moistureLevel -
        skinAnalysisData.previous.moistureLevel) /
        skinAnalysisData.previous.moistureLevel) *
      100,
    oil:
      ((skinAnalysisData.previous.oilLevel -
        skinAnalysisData.current.oilLevel) /
        skinAnalysisData.previous.oilLevel) *
      100,
    acne:
      ((skinAnalysisData.previous.acneCount -
        skinAnalysisData.current.acneCount) /
        skinAnalysisData.previous.acneCount) *
      100,
    redness:
      ((skinAnalysisData.previous.rednessLevel -
        skinAnalysisData.current.rednessLevel) /
        skinAnalysisData.previous.rednessLevel) *
      100,
  };

  res.json({
    statusCode: 200,
    success: true,
    message: "Skin analysis comparison",
    data: {
      current: skinAnalysisData.current,
      previous: skinAnalysisData.previous,
      improvement,
    },
  });
});

// endpoint for updating daily routine completion status
app.post("/api/routine-daily-logs", (req, res) => {
  const { log_date, is_completed } = req.body;
  const existingLog = dailyLogsData.find((log) => log.log_date === log_date);

  if (existingLog) {
    existingLog.is_completed = is_completed;
    return res.json({
      statusCode: 200,
      success: true,
      message: "Daily log updated",
      data: existingLog,
    });
  }

  const newLog = {
    id: `log-${log_date}`,
    user_routine_id: "03aede06-6d2d-43dd-b710-2cebf4bacd72",
    log_date,
    is_completed,
    created_at: new Date().toISOString(),
  };

  dailyLogsData.push(newLog);
  res.status(201).json({
    statusCode: 201,
    success: true,
    message: "Daily log created",
    data: newLog,
  });
});

app.listen(port, () =>
  console.log(`Mock API listening on http://localhost:${port}`),
);
