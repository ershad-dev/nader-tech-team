<script setup>
/**
 * کامپوننت فرم ورود: مدیریت و اعتبارسنجی فرم با استفاده از vee-validate و zod
 */
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as z from 'zod'

// تعریف ساختار اعتبارسنجی (Schema) با استفاده از Zod
// این بخش قوانینِ نوع و طول داده‌ها را مشخص می‌کند
const schema = toTypedSchema(
  z.object({
    email: z.string().email('لطفاً یک آدرس ایمیل معتبر وارد کنید'),
    password: z.string().min(8, 'رمز عبور باید حداقل ۸ کاراکتر باشد')
  })
)

// مقداردهی اولیه فرم و استفاده از hookهای vee-validate
const { handleSubmit, errors, defineField } = useForm({ 
  validationSchema: schema 
})

// تعریفِ فیلدهای فرم برای اتصال به Inputها
const [email] = defineField('email')
const [password] = defineField('password')

/**
 * هندلرِ نهایی پس از تایید اعتبارِ فرم
 * @param {Object} values - مقادیر صحیحِ تایید شده توسط Zod
 */
const onSubmit = handleSubmit((values) => {
  console.log('فرم با موفقیت ارسال شد:', values)
  // در اینجا می‌توانید درخواست API را اجرا کنید
})
</script>

<template>
  <form @submit="onSubmit" class="flex flex-col gap-4 p-4">
    
    <div class="flex flex-col">
      <input 
        v-model="email" 
        name="email" 
        placeholder="ایمیل" 
        class="border p-2 rounded" 
      />
      <span class="text-red-500 text-sm">{{ errors.email }}</span>
    </div>
    
    <div class="flex flex-col">
      <input 
        v-model="password" 
        name="password" 
        type="password" 
        placeholder="پسورد" 
        class="border p-2 rounded" 
      />
      <span class="text-red-500 text-sm">{{ errors.password }}</span>
    </div>
    
    <button type="submit" class="bg-blue-600 text-white p-2 rounded">
      ارسال
    </button>
  </form>
</template>