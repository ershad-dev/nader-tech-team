<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// تعریفِ قوانینِ فرم با Zod
const schema = toTypedSchema(
  z.object({
    email: z.string().email('ایمیلِ معتبر وارد کنید'),
    password: z.string().min(8, 'پسورد باید حداقل ۸ کاراکتر باشد')
  })
)

const { handleSubmit, errors } = useForm({ validationSchema: schema })

const onSubmit = handleSubmit((values) => {
  console.log('فرم با موفقیت ارسال شد:', values)
})
</script>

<template>
  <form @submit="onSubmit">
    <input name="email" placeholder="ایمیل" />
    <span>{{ errors.email }}</span>
    
    <input name="password" type="password" placeholder="پسورد" />
    <span>{{ errors.password }}</span>
    
    <button type="submit">ارسال</button>
  </form>
</template>