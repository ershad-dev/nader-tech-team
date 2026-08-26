<script setup>
import { watch, onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'

// این کامپوننت برای هر دو فیلد فارسی و انگلیسی (و برای توضیحات پروژه / نظر مشتری) قابل استفاده مجدد است.
// خروجی v-model همیشه یک رشته HTML است (همان چیزی که باید در دیتابیس ذخیره و بعداً با v-html نمایش داده شود).

const props = defineProps({
  modelValue: { type: String, default: '' },
  dir: { type: String, default: 'rtl' }, // 'rtl' برای فارسی، 'ltr' برای انگلیسی
  disabled: { type: Boolean, default: false },
  height: { type: String, default: '160px' }, // ارتفاع ثابت؛ اگر متن بیشتر شود، داخل همین باکس اسکرول می‌خورد
})

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  content: props.modelValue || '',
  editable: !props.disabled,
  extensions: [
    StarterKit.configure({
      heading: { levels: [2, 3] },
    }),
    Underline,
    Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
    }),
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
  ],
  onUpdate: ({ editor }) => {
    // اگر ادیتور کاملاً خالی باشد، رشته خالی ذخیره می‌شود نه یک پاراگراف خالی
    const html = editor.isEmpty ? '' : editor.getHTML()
    emit('update:modelValue', html)
  },
})

// همگام‌سازی وقتی مقدار از بیرون (مثلاً هنگام لود اطلاعات از سرور) تغییر می‌کند
watch(
  () => props.modelValue,
  (val) => {
    if (!editor.value) return
    const current = editor.value.isEmpty ? '' : editor.value.getHTML()
    if ((val || '') !== current) {
      editor.value.commands.setContent(val || '', false)
    }
  }
)

watch(
  () => props.disabled,
  (val) => {
    editor.value?.setEditable(!val)
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

const setLink = () => {
  if (!editor.value) return
  const previousUrl = editor.value.getAttributes('link').href
  const url = window.prompt('آدرس لینک را وارد کنید', previousUrl || 'https://')
  if (url === null) return
  if (url.trim() === '') {
    editor.value.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value.chain().focus().extendMarkRange('link').setLink({ href: url.trim() }).run()
}
</script>

<template>
  <div
    class="rte-wrapper border border-gray-300 dark:border-dark-border/40 rounded-[17px] overflow-hidden bg-white/20 dark:bg-dark-input/40 transition-colors"
    :class="{ 'opacity-60': disabled }"
    :dir="dir"
  >
    <!-- نوار ابزار -->
    <div
      v-if="editor && !disabled"
      class="flex flex-wrap items-center gap-1 border-b border-gray-200 dark:border-dark-border/30 px-2 py-1.5 bg-gray-50/70 dark:bg-dark-surface/40"
    >
      <button type="button" @click="editor.chain().focus().toggleBold().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('bold') }]" title="بولد">
        <b>B</b>
      </button>
      <button type="button" @click="editor.chain().focus().toggleItalic().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('italic') }]" title="ایتالیک">
        <i>I</i>
      </button>
      <button type="button" @click="editor.chain().focus().toggleUnderline().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('underline') }]" title="زیرخط">
        <u>U</u>
      </button>
      <button type="button" @click="editor.chain().focus().toggleStrike().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('strike') }]" title="خط‌خورده">
        <s>S</s>
      </button>

      <span class="w-px h-5 bg-gray-300 dark:bg-dark-border/40 mx-1"></span>

      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('heading', { level: 2 }) }]" title="تیتر بزرگ">H2</button>
      <button type="button" @click="editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('heading', { level: 3 }) }]" title="تیتر کوچک">H3</button>

      <span class="w-px h-5 bg-gray-300 dark:bg-dark-border/40 mx-1"></span>

      <button type="button" @click="editor.chain().focus().toggleBulletList().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('bulletList') }]" title="لیست نقطه‌ای">•—</button>
      <button type="button" @click="editor.chain().focus().toggleOrderedList().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('orderedList') }]" title="لیست شماره‌دار">1.</button>
      <button type="button" @click="editor.chain().focus().toggleBlockquote().run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive('blockquote') }]" title="نقل‌قول">❝</button>

      <span class="w-px h-5 bg-gray-300 dark:bg-dark-border/40 mx-1"></span>

      <button type="button" @click="editor.chain().focus().setTextAlign('right').run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive({ textAlign: 'right' }) }]" title="راست‌چین">⇥</button>
      <button type="button" @click="editor.chain().focus().setTextAlign('center').run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive({ textAlign: 'center' }) }]" title="وسط‌چین">↔</button>
      <button type="button" @click="editor.chain().focus().setTextAlign('left').run()" :class="['rte-btn', { 'rte-btn-active': editor.isActive({ textAlign: 'left' }) }]" title="چپ‌چین">⇤</button>

      <span class="w-px h-5 bg-gray-300 dark:bg-dark-border/40 mx-1"></span>

      <button type="button" @click="setLink" :class="['rte-btn', { 'rte-btn-active': editor.isActive('link') }]" title="افزودن لینک">🔗</button>
      <button type="button" @click="editor.chain().focus().undo().run()" class="rte-btn" title="واگرد">↺</button>
      <button type="button" @click="editor.chain().focus().redo().run()" class="rte-btn" title="ازنو">↻</button>
    </div>

    <!-- ناحیه متن -->
    <EditorContent
      :editor="editor"
      class="rte-content px-4 py-3 overflow-y-auto text-sm dark:text-dark-text focus:outline-none"
      :style="{ height, maxHeight: height }"
    />
  </div>
</template>

<style scoped>
.rte-btn {
  @apply w-7 h-7 flex items-center justify-center rounded-md text-xs text-gray-600 dark:text-dark-text/70 hover:bg-gray-200 dark:hover:bg-dark-surface transition-colors;
}
.rte-btn-active {
  @apply bg-[#2d6a66] text-white dark:bg-dark-accent dark:text-dark-text-deep;
}
.rte-content {
  overflow-y: auto;
}
.rte-content :deep(.ProseMirror) {
  outline: none;
  height: 100%;
}
.rte-content :deep(p) {
  margin: 0 0 0.6em 0;
}
.rte-content :deep(p:last-child) {
  margin-bottom: 0;
}
.rte-content :deep(h2) {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0.6em 0 0.3em 0;
}
.rte-content :deep(h3) {
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0.5em 0 0.3em 0;
}
.rte-content :deep(ul) {
  list-style: disc;
  padding-inline-start: 1.25rem;
  margin: 0.4em 0;
}
.rte-content :deep(ol) {
  list-style: decimal;
  padding-inline-start: 1.25rem;
  margin: 0.4em 0;
}
.rte-content :deep(blockquote) {
  border-inline-start: 3px solid #2d6a66;
  padding-inline-start: 0.75rem;
  margin: 0.5em 0;
  color: inherit;
  opacity: 0.85;
}
.rte-content :deep(a) {
  color: #2d6a66;
  text-decoration: underline;
}
</style>