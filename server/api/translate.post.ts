// server/api/translate.post.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const { texts, target = 'en', source = 'fa' } = body

  if (!Array.isArray(texts) || texts.length === 0) {
    return { translations: [] }
  }

  try {
    const res = await $fetch('https://api.cognitive.microsofttranslator.com/translate', {
      method: 'POST',
      query: { 'api-version': '3.0', to: target, from: source },
      headers: {
        'Ocp-Apim-Subscription-Key': config.azureTranslatorKey,
        'Ocp-Apim-Subscription-Region': config.azureTranslatorRegion,
        'Content-Type': 'application/json',
      },
      // آژور تو یه درخواست، آرایه‌ای از متن‌ها رو قبول می‌کنه (نیاز به loop نیست)
      body: texts.map((text) => ({ text: text || '' })),
    })

    const translations = res.map((item, i) => item?.translations?.[0]?.text || texts[i])
    return { translations }
  } catch (err) {
    console.error('خطا در ترجمه (Azure):', err)
    return { translations: texts }
  }
})