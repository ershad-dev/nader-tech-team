<template>
  <div class="w-full h-full flex flex-col" dir="rtl">
    <!-- Header -->
    <div class="px-5 pt-6 pb-4 lg:px-8 lg:pt-8">
      <h1 class="text-[#0F184B] dark:text-white font-bold text-[19px] lg:text-[22px]">
        مدیریت محتوای صفحات
      </h1>
      <p class="text-[#454C6A]/70 dark:text-white/70 text-[12px] lg:text-[13px] mt-1">
        ویرایش محتوای کلید-مقدار صفحات سایت
      </p>
    </div>

    <!-- Page tabs -->
    <div class="px-5 lg:px-8">
      <div class="flex flex-wrap justify-center items-center gap-2 mb-2 bg-[#F7F3EB] dark:bg-dark-surface py-3 lg:py-0 lg:h-[64px] rounded-[27px] px-2">
        <button
          v-for="p in pages"
          :key="p.slug"
          @click="selectPage(p.slug)"
          :class="[
            'px-3 sm:px-4 lg:px-5 py-2 rounded-full transition-all text-[12px] sm:text-[13px] lg:text-[14px] font-medium h-[36px] sm:h-[38px] lg:h-[41px]',
            activePage === p.slug
              ? 'bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white shadow-md font-bold'
              : 'text-[#454C6A] dark:text-white hover:bg-gray-200 dark:hover:bg-dark-input'
          ]"
        >
          {{ p.label }}
        </button>
      </div>
    </div>

    <!-- Toast -->
    <transition name="fade">
      <div
        v-if="toast.message"
        class="mx-5 lg:mx-8 mt-4 px-4 py-2.5 rounded-xl text-[13px] font-bold"
        :class="toast.type === 'error' ? 'bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-white border border-red-200 dark:border-red-800/50' : 'bg-[#67A9A8]/10 dark:bg-dark-accent/10 text-[#2C7379] dark:text-white border border-[#67A9A8]/40 dark:border-dark-accent/40'"
      >
        {{ toast.message }}
      </div>
    </transition>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto px-5 py-5 lg:px-8 lg:py-6 hide-scrollbar">

      <!-- ══════════════════ SERVICES (خدمات) TAB ══════════════════ -->
      <template v-if="activePage === 'services'">

        <!-- Add new service toggle -->
        <div class="mb-4 flex justify-end">
          <button
            v-if="!showAddServiceForm"
            @click="openAddServiceForm"
            class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition"
          >
            + افزودن خدمت جدید
          </button>
        </div>

        <!-- Add new service form -->
        <div
          v-if="showAddServiceForm"
          class="mb-5 bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="font-bold text-[#0F184B] dark:text-white text-[14px]">خدمت جدید</span>
            <button @click="cancelAddService" class="text-[12px] text-[#454C6A]/70 dark:text-white/60 hover:underline">انصراف</button>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">عنوان</label>
                <input
                  v-model="newService.title"
                  type="text"
                  placeholder="مثلاً طراحی وبسایت"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
              <div class="flex-1">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">اسلاگ (slug)</label>
                <input
                  v-model="newService.slug"
                  type="text"
                  dir="ltr"
                  placeholder="web-design"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">خدمت والد (اختیاری)</label>
               <select
  v-model="entry.node.parent_id"
  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
>
  <option class="text-black" :value="null">—   (خدمت اصلی) —</option>
  <option
    class="text-black"
    v-for="opt in topLevelServiceOptions.filter(o => o.node.id !== entry.node.id)"
    :key="opt.node.id"
    :value="opt.node.id"
  >
    {{ opt.node.title || '(بدون عنوان)' }}
  </option>
</select>
              </div>
              <div class="w-full sm:w-40">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">ترتیب نمایش</label>
                <input
                  v-model.number="newService.sort_order"
                  type="number"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">توضیحات</label>
              <div class="border border-[#BFD1D5] dark:border-dark-border rounded-lg overflow-hidden bg-white/20 dark:bg-dark-input/20">
                <span class="hidden">{{ newServiceEditorState.tick }}</span>
                <div v-if="newServiceEditorState.editor" class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#BFD1D5] dark:border-dark-border bg-[#F7F3EB]/60 dark:bg-dark-surface/60">
                  <button type="button" @click="newServiceEditorState.editor.chain().focus().toggleBold().run()" :class="editorBtnClass(newServiceEditorState.editor.isActive('bold'))"><b>B</b></button>
                  <button type="button" @click="newServiceEditorState.editor.chain().focus().toggleItalic().run()" :class="editorBtnClass(newServiceEditorState.editor.isActive('italic'))"><i>I</i></button>
                  <button type="button" @click="newServiceEditorState.editor.chain().focus().toggleUnderline().run()" :class="editorBtnClass(newServiceEditorState.editor.isActive('underline'))"><u>U</u></button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="newServiceEditorState.editor.chain().focus().toggleBulletList().run()" :class="editorBtnClass(newServiceEditorState.editor.isActive('bulletList'))">•</button>
                  <button type="button" @click="newServiceEditorState.editor.chain().focus().toggleOrderedList().run()" :class="editorBtnClass(newServiceEditorState.editor.isActive('orderedList'))">1.</button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="setEditorLink(newServiceEditorState.editor)" :class="editorBtnClass(newServiceEditorState.editor.isActive('link'))">لینک</button>
                </div>
                <editor-content
                  v-if="newServiceEditorState.editor"
                  :editor="newServiceEditorState.editor"
                  class="prosemirror-wrap px-3 py-2 min-h-[100px] max-h-[260px] overflow-y-auto text-[13px] text-[#0F184B] dark:text-white"
                />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <button
                type="button"
                @click="newService.is_active = !newService.is_active"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
                :class="newService.is_active ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white' : 'bg-gray-50 dark:bg-dark-input border-gray-300 dark:border-dark-border text-gray-400 dark:text-white/60'"
              >
                <span class="w-8 h-4 rounded-full relative transition-colors" :class="newService.is_active ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-border'">
                  <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" :class="newService.is_active ? 'right-0.5' : 'right-4'" />
                </span>
                <!-- <span class="text-[12px] font-bold">{{ newService.is_active ? 'فعال' : 'غیرفعال' }}</span> -->
              </button>

              <button
                @click="addService"
                :disabled="addingService"
                class="px-4 py-2 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
              >
                {{ addingService ? 'در حال افزودن...' : 'افزودن' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isLoadingServices" class="flex items-center justify-center h-40">
          <div class="w-8 h-8 border-[3px] border-[#67A9A8] dark:border-dark-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Empty -->
        <div v-else-if="!flatServiceEntries.length" class="flex flex-col items-center justify-center h-40 text-center gap-2">
          <p class="text-[#454C6A]/70 dark:text-white/70 text-[13px]">هنوز خدمتی ثبت نشده است.</p>
        </div>

        <!-- Services list (flattened tree, indented by level) -->
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="entry in flatServiceEntries"
            :key="entry.node.id"
            class="bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 dark:border-dark-border transition-all duration-300"
            :style="{ marginRight: (entry.level * 22) + 'px' }"
          >
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2 flex-wrap min-w-0">
                <span v-if="entry.level" class="text-[#67A9A8] dark:text-dark-accent text-[13px]">└</span>
                <span class="font-bold text-[#000000] dark:text-white text-[15px] sm:text-[17px]">
                  {{ entry.node.title || '(بدون عنوان)' }}
                </span>
                <!-- <span
                  class="px-2 py-0.5 rounded-md text-[10px] font-bold"
                  :class="entry.node.is_active
                    ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 text-[#2C7379] dark:text-dark-highlight'
                    : 'bg-gray-100 dark:bg-dark-input text-gray-500 dark:text-white/50'"
                >
                  {{ entry.node.is_active ? 'فعال' : 'غیرفعال' }}
                </span> -->
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <template v-if="confirmDeleteServiceId === entry.node.id">
                  <button
                    @click="doDeleteService(entry.node)"
                    :disabled="entry.node._deleting"
                    class="px-3 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {{ entry.node._deleting ? '...' : 'تایید حذف' }}
                  </button>
                  <button
                    @click="confirmDeleteServiceId = null"
                    class="px-3 py-1.5 rounded-full border border-gray-300 dark:border-dark-border text-[#454C6A] dark:text-white/70 text-[12px] font-bold hover:bg-gray-100 dark:hover:bg-dark-input transition"
                  >
                    انصراف
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="saveService(entry.node)"
                    :disabled="entry.node._saving"
                    class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
                  >
                    {{ entry.node._saving ? '...' : 'ذخیره' }}
                  </button>
                  <button
                    @click="confirmDeleteServiceId = entry.node.id"
                    class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    حذف
                  </button>
                </template>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">عنوان</label>
                  <input
                    v-model="entry.node.title"
                    type="text"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">اسلاگ</label>
                  <input
                    v-model="entry.node.slug"
                    type="text"
                    dir="ltr"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">خدمت والد</label>
<select
  v-model="newService.parent_id"
  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
>
  <option class="text-black" :value="null">—  (خدمت اصلی) —</option>
  <option
    class="text-black"
    v-for="entry in topLevelServiceOptions"
    :key="entry.node.id"
    :value="entry.node.id"
  >
    {{ entry.node.title || '(بدون عنوان)' }}
  </option>
</select>
                </div>
                <div class="w-full sm:w-40">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">ترتیب نمایش</label>
                  <input
                    v-model.number="entry.node.sort_order"
                    type="number"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
              </div>

              <!-- <div>
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">توضیحات</label>
                <div class="border border-[#BFD1D5] dark:border-dark-border rounded-lg overflow-hidden bg-white/20 dark:bg-dark-input/20">
                  <span class="hidden">{{ entry.node._editorTick }}</span>
                  <div v-if="entry.node._editor" class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#BFD1D5] dark:border-dark-border bg-[#F7F3EB]/60 dark:bg-dark-surface/60">
                    <button type="button" @click="entry.node._editor.chain().focus().toggleBold().run()" :class="editorBtnClass(entry.node._editor.isActive('bold'))"><b>B</b></button>
                    <button type="button" @click="entry.node._editor.chain().focus().toggleItalic().run()" :class="editorBtnClass(entry.node._editor.isActive('italic'))"><i>I</i></button>
                    <button type="button" @click="entry.node._editor.chain().focus().toggleUnderline().run()" :class="editorBtnClass(entry.node._editor.isActive('underline'))"><u>U</u></button>
                    <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                    <button type="button" @click="entry.node._editor.chain().focus().toggleBulletList().run()" :class="editorBtnClass(entry.node._editor.isActive('bulletList'))">•</button>
                    <button type="button" @click="entry.node._editor.chain().focus().toggleOrderedList().run()" :class="editorBtnClass(entry.node._editor.isActive('orderedList'))">1.</button>
                    <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                    <button type="button" @click="setEditorLink(entry.node._editor)" :class="editorBtnClass(entry.node._editor.isActive('link'))">لینک</button>
                  </div>
                  <editor-content
                    v-if="entry.node._editor"
                    :editor="entry.node._editor"
                    class="prosemirror-wrap px-3 py-2 min-h-[90px] max-h-[260px] overflow-y-auto text-[13px] text-[#0F184B] dark:text-white"
                  />
                </div>
              </div> -->
              <!-- خدمات فعال / غیرفعال -->
              <!-- <div>
                <button
                  type="button"
                  @click="entry.node.is_active = !entry.node.is_active"
                  class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
                  :class="entry.node.is_active ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white' : 'bg-gray-50 dark:bg-dark-input border-gray-300 dark:border-dark-border text-gray-400 dark:text-white/60'"
                >
                  <span class="w-8 h-4 rounded-full relative transition-colors" :class="entry.node.is_active ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-border'">
                    <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" :class="entry.node.is_active ? 'right-0.5' : 'right-4'" />
                  </span>
                  <span class="text-[12px] font-bold">{{ entry.node.is_active ? 'فعال' : 'غیرفعال' }}</span>
                </button>
              </div> -->
            </div>
          </div>
        </div>
      </template>

      <!-- ══════════════════ KEY-VALUE PAGE CONTENT (about / events / order) ══════════════════ -->
      <template v-else>

        <!-- Service images quick panel (only on the events page) -->
        <div
          v-if="activePage === 'events' && serviceGroups.length"
          class="mb-5 bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 rounded-2xl border border-[#67A9A8]/40 dark:border-dark-accent/40"
        >
          <p class="font-bold text-[#0F184B] dark:text-white text-[13px] mb-3">تصویر هر کارت سرویس</p>
          <div class="flex flex-col gap-2">
            <div
              v-for="g in serviceGroups"
              :key="g.number"
              class="flex items-center justify-between gap-3 px-3 py-2 rounded-lg bg-white/30 dark:bg-dark-input/30"
            >
              <div class="flex items-center gap-2 min-w-0">
                <img
                  v-if="g.hasImage"
                  :src="resolveImageUrl(g.imageValue)"
                  alt=""
                  class="w-8 h-8 rounded object-cover border border-[#BFD1D5] dark:border-dark-border shrink-0"
                />
                <span class="text-[12px] text-[#0F184B] dark:text-white truncate">
                  سرویس {{ g.number }}{{ g.title ? ' — ' + g.title : '' }}
                </span>
              </div>
              <button
                v-if="!g.hasImage"
                @click="quickAddServiceImage(g.number)"
                class="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition shrink-0"
              >
                + افزودن تصویر
              </button>
              <span v-else class="text-[11px] text-[#2C7379] dark:text-dark-highlight font-bold shrink-0">تصویر ثبت شده ✓</span>
            </div>
          </div>
        </div>

        <!-- Add new item toggle -->
        <div class="mb-4 flex justify-end">
          <button
            v-if="!showAddForm"
            @click="showAddForm = true"
            class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition"
          >
            + افزودن آیتم جدید
          </button>
        </div>

        <!-- Add new item form -->
        <div
          v-if="showAddForm"
          class="mb-5 bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60"
        >
          <div class="flex items-center justify-between mb-3">
            <span class="font-bold text-[#0F184B] dark:text-white text-[14px]">آیتم جدید در «{{ activePageLabel }}»</span>
            <button @click="cancelAdd" class="text-[12px] text-[#454C6A]/70 dark:text-white/60 hover:underline">انصراف</button>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">کلید (key)</label>
                <input
                  v-model="newItem.key"
                  type="text"
                  placeholder="مثلاً service_1_image"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
              <div class="w-full sm:w-48">
                <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">نوع (type)</label>
                <select
                  v-model="newItem.type"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                >
                  <option value="text">متن</option>
                  <option value="html">HTML</option>
                  <option value="image_path">تصویر</option>
                  <option value="json">JSON</option>
                  <option value="number">عدد</option>
                  <option value="boolean">بولین</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] text-[#454C6A]/70 dark:text-white/60 mb-1">مقدار (value)</label>

              <!-- text -->
              <textarea
                v-if="newItem.type === 'text'"
                v-model="newItem.value"
                rows="2"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />

              <!-- html: Tiptap -->
              <div
                v-else-if="newItem.type === 'html'"
                class="border border-[#BFD1D5] dark:border-dark-border rounded-lg overflow-hidden bg-white/20 dark:bg-dark-input/20"
              >
                <span class="hidden">{{ newItemEditorState.tick }}</span>
                <div v-if="newItemEditorState.editor" class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#BFD1D5] dark:border-dark-border bg-[#F7F3EB]/60 dark:bg-dark-surface/60">
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleBold().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('bold'))"><b>B</b></button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleItalic().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('italic'))"><i>I</i></button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleUnderline().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('underline'))"><u>U</u></button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleStrike().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('strike'))"><s>S</s></button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="newItemEditorState.editor.chain().focus().setParagraph().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('paragraph'))">P</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="editorBtnClass(newItemEditorState.editor.isActive('heading', { level: 2 }))">H2</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="editorBtnClass(newItemEditorState.editor.isActive('heading', { level: 3 }))">H3</button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleBulletList().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('bulletList'))">•</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleOrderedList().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('orderedList'))">1.</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().toggleBlockquote().run()" :class="editorBtnClass(newItemEditorState.editor.isActive('blockquote'))">”</button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="newItemEditorState.editor.chain().focus().setTextAlign('right').run()" :class="editorBtnClass(newItemEditorState.editor.isActive({ textAlign: 'right' }))">راست</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().setTextAlign('center').run()" :class="editorBtnClass(newItemEditorState.editor.isActive({ textAlign: 'center' }))">وسط</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().setTextAlign('left').run()" :class="editorBtnClass(newItemEditorState.editor.isActive({ textAlign: 'left' }))">چپ</button>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="setEditorLink(newItemEditorState.editor)" :class="editorBtnClass(newItemEditorState.editor.isActive('link'))">لینک</button>
                  <label class="px-2 py-1 rounded text-[11px] font-bold cursor-pointer hover:bg-[#67A9A8]/15 dark:hover:bg-dark-accent/15 text-[#454C6A] dark:text-white/80">
                    تصویر
                    <input type="file" accept="image/*" class="hidden" @change="insertEditorImage($event, newItemEditorState.editor)" />
                  </label>
                  <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                  <button type="button" @click="newItemEditorState.editor.chain().focus().undo().run()">↶</button>
                  <button type="button" @click="newItemEditorState.editor.chain().focus().redo().run()">↷</button>
                </div>
                <editor-content
                  v-if="newItemEditorState.editor"
                  :editor="newItemEditorState.editor"
                  class="prosemirror-wrap px-3 py-2 min-h-[120px] max-h-[320px] overflow-y-auto text-[13px] text-[#0F184B] dark:text-white"
                />
              </div>

              <!-- json -->
              <textarea
                v-else-if="newItem.type === 'json'"
                v-model="newItem.value"
                rows="5"
                spellcheck="false"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />

              <!-- image_path -->
              <div v-else-if="newItem.type === 'image_path'" class="flex flex-col sm:flex-row sm:items-start gap-3">
                <img
                  v-if="newItem.value"
                  :src="resolveImageUrl(newItem.value)"
                  alt=""
                  class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5] dark:border-dark-border shrink-0"
                  @error="$event.target.style.visibility = 'hidden'"
                />
                <div class="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
                  <input
                    v-model="newItem.value"
                    type="text"
                    placeholder="لینک تصویر یا آپلود از سیستم"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                  <label
                    class="w-fit cursor-pointer px-3 py-1.5 rounded-full border border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white text-[11px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition"
                    :class="{ 'opacity-50 pointer-events-none': newItem._uploading }"
                  >
                    {{ newItem._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
                    <input type="file" accept="image/*" class="hidden" :disabled="newItem._uploading" @change="handleImageFieldUpload($event, newItem)" />
                  </label>
                  <span v-if="newItem._file" class="text-[11px] text-[#454C6A]/70 dark:text-white/60">
                    فایل انتخاب‌شده: {{ newItem._file.name }} — با «افزودن» ارسال می‌شود
                  </span>
                </div>
              </div>

              <!-- number -->
              <input
                v-else-if="newItem.type === 'number'"
                v-model.number="newItem.value"
                type="number"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
              />

              <!-- boolean -->
              <!-- <button
                v-else-if="newItem.type === 'boolean'"
                type="button"
                @click="newItem.value = !newItem.value"
                class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
                :class="newItem.value ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white' : 'bg-gray-50 dark:bg-dark-input border-gray-300 dark:border-dark-border text-gray-400 dark:text-white/60'"
              >
                <span class="w-8 h-4 rounded-full relative transition-colors" :class="newItem.value ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-border'">
                  <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" :class="newItem.value ? 'right-0.5' : 'right-4'" />
                </span>
                <span class="text-[12px] font-bold">{{ newItem.value ? 'فعال' : 'غیرفعال' }}</span>
              </button> -->
            </div>

            <div class="flex justify-end">
              <button
                @click="addItem"
                :disabled="adding"
                class="px-4 py-2 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
              >
                {{ adding ? 'در حال افزودن...' : 'افزودن' }}
              </button>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-if="isLoading" class="flex items-center justify-center h-40">
          <div class="w-8 h-8 border-[3px] border-[#67A9A8] dark:border-dark-accent border-t-transparent rounded-full animate-spin"></div>
        </div>

        <!-- Empty -->
        <div v-else-if="!items.length" class="flex flex-col items-center justify-center h-40 text-center gap-2">
          <p class="text-[#454C6A]/70 dark:text-white/70 text-[13px]">
            هنوز آیتمی برای صفحه «{{ activePageLabel }}» ثبت نشده است.
          </p>
        </div>

        <!-- Items -->
        <div v-else class="flex flex-col gap-4">
          <div
            v-for="item in sortedItems"
            :key="item.id ?? item.key"
            class="bg-[#FFFFFF3B] dark:bg-dark-input/20 p-4 sm:p-5 lg:p-6 rounded-2xl border border-gray-300 dark:border-dark-border transition-all duration-300"
          >
            <div class="flex items-start justify-between gap-3 mb-3">
              <div class="flex items-center gap-2 flex-wrap">
                <span class="font-bold text-[#000000] dark:text-white text-[15px] sm:text-[17px] font-roboto">{{ item.key }}</span>
                <span class="px-2 py-0.5 rounded-md text-[10px] font-bold tracking-wide" :class="typeBadgeClass(item.type)">
                  {{ typeLabel(item.type) }}
                </span>
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <template v-if="confirmDeleteKey === (item.id ?? item.key)">
                  <button
                    @click="doDelete(item)"
                    :disabled="item._deleting"
                    class="px-3 py-1.5 rounded-full bg-red-500 text-white text-[12px] font-bold hover:bg-red-600 transition disabled:opacity-50"
                  >
                    {{ item._deleting ? '...' : 'تایید حذف' }}
                  </button>
                  <button
                    @click="confirmDeleteKey = null"
                    class="px-3 py-1.5 rounded-full border border-gray-300 dark:border-dark-border text-[#454C6A] dark:text-white/70 text-[12px] font-bold hover:bg-gray-100 dark:hover:bg-dark-input transition"
                  >
                    انصراف
                  </button>
                </template>
                <template v-else>
                  <button
                    @click="saveItem(item)"
                    :disabled="item._saving"
                    class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
                  >
                    {{ item._saving ? '...' : 'ذخیره' }}
                  </button>
                  <button
                    @click="confirmDeleteKey = item.id ?? item.key"
                    class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                  >
                    حذف
                  </button>
                </template>
              </div>
            </div>

            <!-- text -->
            <textarea
              v-if="item.type === 'text'"
              v-model="item.value"
              rows="2"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
            />

            <!-- html: Tiptap -->
            <div
              v-else-if="item.type === 'html'"
              class="border border-[#BFD1D5] dark:border-dark-border rounded-lg overflow-hidden bg-white/20 dark:bg-dark-input/20"
            >
              <span class="hidden">{{ item._editorTick }}</span>
              <div v-if="item._editor" class="flex flex-wrap items-center gap-1 px-2 py-1.5 border-b border-[#BFD1D5] dark:border-dark-border bg-[#F7F3EB]/60 dark:bg-dark-surface/60">
                <button type="button" @click="item._editor.chain().focus().toggleBold().run()" :class="editorBtnClass(item._editor.isActive('bold'))"><b>B</b></button>
                <button type="button" @click="item._editor.chain().focus().toggleItalic().run()" :class="editorBtnClass(item._editor.isActive('italic'))"><i>I</i></button>
                <button type="button" @click="item._editor.chain().focus().toggleUnderline().run()" :class="editorBtnClass(item._editor.isActive('underline'))"><u>U</u></button>
                <button type="button" @click="item._editor.chain().focus().toggleStrike().run()" :class="editorBtnClass(item._editor.isActive('strike'))"><s>S</s></button>
                <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                <button type="button" @click="item._editor.chain().focus().setParagraph().run()" :class="editorBtnClass(item._editor.isActive('paragraph'))">P</button>
                <button type="button" @click="item._editor.chain().focus().toggleHeading({ level: 2 }).run()" :class="editorBtnClass(item._editor.isActive('heading', { level: 2 }))">H2</button>
                <button type="button" @click="item._editor.chain().focus().toggleHeading({ level: 3 }).run()" :class="editorBtnClass(item._editor.isActive('heading', { level: 3 }))">H3</button>
                <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                <button type="button" @click="item._editor.chain().focus().toggleBulletList().run()" :class="editorBtnClass(item._editor.isActive('bulletList'))">•</button>
                <button type="button" @click="item._editor.chain().focus().toggleOrderedList().run()" :class="editorBtnClass(item._editor.isActive('orderedList'))">1.</button>
                <button type="button" @click="item._editor.chain().focus().toggleBlockquote().run()" :class="editorBtnClass(item._editor.isActive('blockquote'))">”</button>
                <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                <button type="button" @click="item._editor.chain().focus().setTextAlign('right').run()" :class="editorBtnClass(item._editor.isActive({ textAlign: 'right' }))">راست</button>
                <button type="button" @click="item._editor.chain().focus().setTextAlign('center').run()" :class="editorBtnClass(item._editor.isActive({ textAlign: 'center' }))">وسط</button>
                <button type="button" @click="item._editor.chain().focus().setTextAlign('left').run()" :class="editorBtnClass(item._editor.isActive({ textAlign: 'left' }))">چپ</button>
                <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                <button type="button" @click="setEditorLink(item._editor)" :class="editorBtnClass(item._editor.isActive('link'))">لینک</button>
                <label class="px-2 py-1 rounded text-[11px] font-bold cursor-pointer hover:bg-[#67A9A8]/15 dark:hover:bg-dark-accent/15 text-[#454C6A] dark:text-white/80">
                  تصویر
                  <input type="file" accept="image/*" class="hidden" @change="insertEditorImage($event, item._editor)" />
                </label>
                <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                <button type="button" @click="item._editor.chain().focus().undo().run()">↶</button>
                <button type="button" @click="item._editor.chain().focus().redo().run()">↷</button>
              </div>
              <editor-content
                v-if="item._editor"
                :editor="item._editor"
                class="prosemirror-wrap px-3 py-2 min-h-[120px] max-h-[320px] overflow-y-auto text-[13px] text-[#0F184B] dark:text-white"
              />
            </div>

            <!-- workflow steps (order page) -->
            <div v-else-if="isWorkflowItem(item)" class="flex flex-col gap-3">
              <div
                v-for="(step, idx) in parseSteps(item)"
                :key="step.id ?? idx"
                class="p-3 rounded-xl border border-[#BFD1D5] dark:border-dark-border bg-white/30 dark:bg-dark-input/30"
              >
                <div class="flex items-center justify-between mb-2">
                  <span class="text-[11px] font-bold text-[#2C7379] dark:text-dark-highlight">مرحله {{ idx + 1 }}</span>
                  <div class="flex items-center gap-1">
                    <button
                      type="button"
                      @click="moveStep(item, idx, -1)"
                      :disabled="idx === 0"
                      class="w-6 h-6 rounded-full text-[12px] text-[#454C6A] dark:text-white/70 hover:bg-gray-200 dark:hover:bg-dark-input disabled:opacity-30 transition"
                    >↑</button>
                    <button
                      type="button"
                      @click="moveStep(item, idx, 1)"
                      :disabled="idx === parseSteps(item).length - 1"
                      class="w-6 h-6 rounded-full text-[12px] text-[#454C6A] dark:text-white/70 hover:bg-gray-200 dark:hover:bg-dark-input disabled:opacity-30 transition"
                    >↓</button>
                    <button
                      type="button"
                      @click="removeStep(item, idx)"
                      class="w-6 h-6 rounded-full text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition"
                    >×</button>
                  </div>
                </div>

                <input
                  :value="step.title"
                  @input="updateStepField(item, idx, 'title', $event.target.value)"
                  type="text"
                  placeholder="عنوان مرحله"
                  class="w-full mb-2 px-3 py-1.5 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] font-bold text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />

                <!-- content: Tiptap -->
                <div class="border border-[#BFD1D5] dark:border-dark-border rounded-lg overflow-hidden bg-white/20 dark:bg-dark-input/20">
                  <span class="hidden">{{ stepEditorTick }}</span>
                  <div class="flex flex-wrap items-center gap-1 px-2 py-1 border-b border-[#BFD1D5] dark:border-dark-border bg-[#F7F3EB]/60 dark:bg-dark-surface/60">
                    <button type="button" @click="getStepEditor(item, step).chain().focus().toggleBold().run()" :class="editorBtnClass(getStepEditor(item, step).isActive('bold'))"><b>B</b></button>
                    <button type="button" @click="getStepEditor(item, step).chain().focus().toggleItalic().run()" :class="editorBtnClass(getStepEditor(item, step).isActive('italic'))"><i>I</i></button>
                    <button type="button" @click="getStepEditor(item, step).chain().focus().toggleUnderline().run()" :class="editorBtnClass(getStepEditor(item, step).isActive('underline'))"><u>U</u></button>
                    <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                    <button type="button" @click="getStepEditor(item, step).chain().focus().toggleBulletList().run()" :class="editorBtnClass(getStepEditor(item, step).isActive('bulletList'))">•</button>
                    <button type="button" @click="getStepEditor(item, step).chain().focus().toggleOrderedList().run()" :class="editorBtnClass(getStepEditor(item, step).isActive('orderedList'))">1.</button>
                    <span class="w-px h-5 bg-[#BFD1D5] dark:bg-dark-border mx-1" />
                    <button type="button" @click="setEditorLink(getStepEditor(item, step))" :class="editorBtnClass(getStepEditor(item, step).isActive('link'))">لینک</button>
                  </div>
                  <editor-content
                    :editor="getStepEditor(item, step)"
                    class="prosemirror-wrap px-3 py-2 min-h-[70px] text-[13px] text-[#0F184B] dark:text-white"
                  />
                </div>
              </div>

              <button
                type="button"
                @click="addStep(item)"
                class="px-3 py-2 rounded-lg border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60 text-[#2C7379] dark:text-dark-highlight text-[12px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition"
              >
                + افزودن مرحله
              </button>
            </div>

            <!-- json -->
            <textarea
              v-else-if="item.type === 'json'"
              v-model="item.value"
              rows="5"
              spellcheck="false"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
            />

            <!-- image_path -->
            <div v-else-if="item.type === 'image_path'" class="flex flex-col sm:flex-row sm:items-start gap-3">
              <img
                v-if="item.value"
                :src="resolveImageUrl(item.value)"
                alt=""
                class="w-16 h-16 rounded-lg object-cover border border-[#BFD1D5] dark:border-dark-border shrink-0"
                @error="$event.target.style.visibility = 'hidden'"
              />
              <div class="w-full sm:flex-1 min-w-0 flex flex-col gap-2">
                <input
                  v-model="item.value"
                  type="text"
                  placeholder="لینک تصویر یا آپلود از سیستم"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
                <label
                  class="w-fit cursor-pointer px-3 py-1.5 rounded-full border border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white text-[11px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition"
                  :class="{ 'opacity-50 pointer-events-none': item._uploading }"
                >
                  {{ item._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
                  <input type="file" accept="image/*" class="hidden" :disabled="item._uploading" @change="handleImageFieldUpload($event, item)" />
                </label>
                <span v-if="item._file" class="text-[11px] text-[#454C6A]/70 dark:text-white/60">
                  فایل انتخاب‌شده: {{ item._file.name }} — با «ذخیره» ارسال می‌شود
                </span>
              </div>
            </div>

            <!-- number -->
            <input
              v-else-if="item.type === 'number'"
              v-model.number="item.value"
              type="number"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
            />

            <!-- boolean -->
            <!-- <button
              v-else-if="item.type === 'boolean'"
              type="button"
              @click="item.value = !item.value"
              class="flex items-center gap-2 px-3 py-1.5 rounded-full border w-fit transition"
              :class="item.value ? 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 border-[#67A9A8] dark:border-dark-accent text-[#2C7379] dark:text-white' : 'bg-gray-50 dark:bg-dark-input border-gray-300 dark:border-dark-border text-gray-400 dark:text-white/60'"
            >
              <span class="w-8 h-4 rounded-full relative transition-colors" :class="item.value ? 'bg-[#67A9A8] dark:bg-dark-accent' : 'bg-gray-300 dark:bg-dark-border'">
                <span class="absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all" :class="item.value ? 'right-0.5' : 'right-4'" />
              </span>
              <span class="text-[12px] font-bold">{{ item.value ? 'فعال' : 'غیرفعال' }}</span>
            </button> -->

            <!-- fallback -->
            <textarea
              v-else
              v-model="item.value"
              rows="2"
              class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch, markRaw } from 'vue'
import { Editor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Link from '@tiptap/extension-link'
import ImageExtension from '@tiptap/extension-image'
import TextAlign from '@tiptap/extension-text-align'


const API_BASE = 'https://nadertechnologyteam.ir/api'
// Files uploaded via image_path come back from the backend as a RELATIVE
// path (e.g. "pages/events/GHKLJVcrr65FQnilcCupl7ld1AD1Y1QyLfNiGymZ.jpg"),
// not a full URL. Confirmed by opening this in the browser:
//   https://nadertechnologyteam.ir/storage/pages/events/GHKLJVcrr65FQnilcCupl7ld1AD1Y1QyLfNiGymZ.jpg
// -> works and shows the uploaded image. So the storage base below must be
// prefixed onto any relative image_path value before it's used as <img src>.
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'
const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB

// Turns an image_path value into something usable as <img :src>.
// Passes through untouched if it's already a full URL (http/https),
// a local preview (blob:), or a data URL (data:) — only bare relative
// paths coming straight from the backend get the storage base prepended.
const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

const { authHeader, initFromStorage } = useAdminAuth()

// NOTE: tab slug 'services' maps to the /api/services endpoints (see below),
// not to the key-value /page/{page} content endpoints the other tabs use.
const pages = ref([
  { slug: 'about', label: 'درباره ما' },
  { slug: 'events', label: 'ایونت‌ها' },
  { slug: 'order', label: 'سفارش' },
  { slug: 'services', label: 'خدمات' },
])
const activePage = ref('about')
const activePageLabel = computed(() => pages.value.find(p => p.slug === activePage.value)?.label ?? activePage.value)

const items = ref([])
const isLoading = ref(false)

const toast = reactive({ message: '', type: 'success' })
let toastTimer = null
const showToast = (message, type = 'success') => {
  toast.message = message
  toast.type = type
  clearTimeout(toastTimer)
  toastTimer = setTimeout(() => { toast.message = '' }, 2800)
}

const typeLabel = (type) => ({
  text: 'متن',
  html: 'HTML',
  image_path: 'تصویر',
  json: 'JSON',
  number: 'عدد',
  boolean: 'بولین',
}[type] || type)

const typeBadgeClass = (type) => ({
  text: 'bg-[#67A9A8]/15 dark:bg-dark-accent/15 text-[#2C7379] dark:text-dark-highlight',
  html: 'bg-purple-50 dark:bg-purple-900/30 text-purple-500 dark:text-purple-300',
  image_path: 'bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-300',
  json: 'bg-blue-50 dark:bg-blue-900/30 text-blue-500 dark:text-blue-300',
  number: 'bg-gray-100 dark:bg-dark-input text-gray-500 dark:text-dark-text-deep/70',
  boolean: 'bg-pink-50 dark:bg-pink-900/30 text-pink-500 dark:text-pink-300',
}[type] || 'bg-gray-100 dark:bg-dark-input text-gray-500 dark:text-dark-text-deep/70')

// ── Grouping / sorting for the events page (service_N, service_N_image, ...) ──
// Items belonging to the same service number are shown together and in
// numeric order, instead of the default alphabetical/insertion order.
const sortedItems = computed(() => {
  return [...items.value].sort((a, b) => {
    const an = a.key.match(/^service_(\d+)/)
    const bn = b.key.match(/^service_(\d+)/)
    if (an && bn) {
      const na = Number(an[1])
      const nb = Number(bn[1])
      if (na !== nb) return na - nb
      return a.key.localeCompare(b.key)
    }
    if (an) return -1
    if (bn) return 1
    return a.key.localeCompare(b.key)
  })
})

// List of detected service numbers on the events page, with whether an
// image (service_N_image) already exists for each one.
const serviceGroups = computed(() => {
  if (activePage.value !== 'events') return []
  const numbers = new Set()
  items.value.forEach((item) => {
    const match = item.key.match(/^service_(\d+)$/)
    if (match) numbers.add(Number(match[1]))
  })
  return Array.from(numbers)
    .sort((a, b) => a - b)
    .map((n) => {
      const imageItem = items.value.find((i) => i.key === `service_${n}_image`)
      const serviceItem = items.value.find((i) => i.key === `service_${n}`)
      const title = (serviceItem?.value || '').split('\n')[0] || ''
      return {
        number: n,
        title,
        hasImage: !!imageItem,
        imageValue: imageItem?.value || '',
      }
    })
})

// Opens the add-form pre-filled with the correct key/type for a service's image,
// so the admin doesn't have to type "service_N_image" by hand.
const quickAddServiceImage = (n) => {
  showAddForm.value = true
  newItem.key = `service_${n}_image`
  newItem.type = 'image_path'
  newItem.value = ''
}

// ── Tiptap: shared setup ────────────────────────────────────
const buildExtensions = () => [
  StarterKit,
  Underline,
  Link.configure({ openOnClick: false, autolink: true }),
  ImageExtension,
  TextAlign.configure({ types: ['heading', 'paragraph'] }),
]

const editorBtnClass = (active) => [
  'px-2 py-1 rounded text-[12px] font-bold transition',
  active
    ? 'bg-[#67A9A8] dark:bg-dark-accent text-white'
    : 'text-[#454C6A] dark:text-white/80 hover:bg-[#67A9A8]/15 dark:hover:bg-dark-accent/15',
]

const setEditorLink = (editor) => {
  if (!editor) return
  const previousUrl = editor.getAttributes('link').href
  const url = window.prompt('آدرس لینک را وارد کنید:', previousUrl || 'https://')
  if (url === null) return
  if (url === '') {
    editor.chain().focus().unsetLink().run()
    return
  }
  editor.chain().focus().setLink({ href: url }).run()
}

// Image inserted inline inside the HTML content itself (not the image_path field).
// No dedicated upload endpoint has been confirmed for this yet, so it's still
// embedded as a base64 data URL. If/when the backend exposes an upload route
// for inline images too, this should switch to the same FormData approach
// used in handleImageFieldUpload below.
const insertEditorImage = (event, editor) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file || !editor) return
  if (!file.type.startsWith('image/')) {
    showToast('فایل انتخاب‌شده تصویر نیست', 'error')
    return
  }
  if (file.size > MAX_IMAGE_SIZE) {
    showToast('حجم تصویر نباید بیشتر از ۲ مگابایت باشد', 'error')
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    editor.chain().focus().setImage({ src: reader.result }).run()
  }
  reader.onerror = () => showToast('خطا در خواندن فایل تصویر', 'error')
  reader.readAsDataURL(file)
}

// ── Tiptap: per-item editor instances (type === 'html') ──────
// Editor instances are stored with markRaw() so Vue doesn't deep-proxy
// them (Tiptap/ProseMirror objects break under a reactive Proxy).
// `_editorTick` is a plain reactive counter bumped on every transaction
// so toolbar active-states (bold/italic/...) re-render live.
const createEditorForItem = (item) => {
  if (item.type !== 'html' || item._editor) return
  item._editorTick = 0
  const editor = new Editor({
    content: item.value || '',
    extensions: buildExtensions(),
    onUpdate: ({ editor }) => {
      item.value = editor.getHTML()
      item._editorTick++
    },
    onTransaction: () => { item._editorTick++ },
  })
  item._editor = markRaw(editor)
}

const destroyItemEditor = (item) => {
  item._editor?.destroy()
  item._editor = null
}

const destroyAllItemEditors = () => {
  items.value.forEach(destroyItemEditor)
}

// ── Tiptap: add-new-item editor instance ────────────────────
const newItemEditorState = reactive({ editor: null, tick: 0 })

const ensureNewItemEditor = () => {
  if (newItemEditorState.editor) return
  const editor = new Editor({
    content: newItem.value || '',
    extensions: buildExtensions(),
    onUpdate: ({ editor }) => {
      newItem.value = editor.getHTML()
      newItemEditorState.tick++
    },
    onTransaction: () => { newItemEditorState.tick++ },
  })
  newItemEditorState.editor = markRaw(editor)
}

const destroyNewItemEditor = () => {
  newItemEditorState.editor?.destroy()
  newItemEditorState.editor = null
}

// ── Workflow (order page) steps editor ──────────────────────
// Only the "workflow" json item on the "order" page gets the dedicated
// step-by-step editor instead of a raw JSON textarea. Steps are kept as
// plain {id, title, content} objects; item.value stays the JSON string
// source of truth, so save/delete logic elsewhere is untouched.
// NOTE: step.content is stored as HTML (via Tiptap), not plain text —
// wherever this is rendered outside the admin, it needs v-html.
const isWorkflowItem = (item) => item.page === 'order' && item.type === 'json' && item.key === 'workflow'

const parseSteps = (item) => {
  try {
    const parsed = JSON.parse(item.value || '[]')
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const writeSteps = (item, steps) => {
  item.value = JSON.stringify(steps)
}

const updateStepField = (item, index, field, val) => {
  const steps = parseSteps(item)
  if (!steps[index]) return
  steps[index] = { ...steps[index], [field]: val }
  writeSteps(item, steps)
}

const addStep = (item) => {
  const steps = parseSteps(item)
  const nextId = steps.length ? Math.max(...steps.map(s => Number(s.id) || 0)) + 1 : 1
  steps.push({ id: nextId, title: '', content: '' })
  writeSteps(item, steps)
}

const removeStep = (item, index) => {
  const steps = parseSteps(item)
  const removed = steps[index]
  steps.splice(index, 1)
  writeSteps(item, steps)
  if (removed) destroyStepEditor(item, removed)
}

const moveStep = (item, index, dir) => {
  const steps = parseSteps(item)
  const target = index + dir
  if (target < 0 || target >= steps.length) return
  ;[steps[index], steps[target]] = [steps[target], steps[index]]
  writeSteps(item, steps)
}

// ── Workflow step content editors (Tiptap) ──────────────────
// Keyed by `${item.key}:${step.id}` since steps are plain objects
// re-created on every writeSteps() call — the editor can't be stashed
// on the step object itself, it would be lost on the next write.
const stepEditors = reactive(new Map())
const stepEditorTick = ref(0) // bumped on every transaction to re-render toolbar active-states

const stepEditorKey = (item, step) => `${item.key}:${step.id}`

const getStepEditor = (item, step) => {
  const k = stepEditorKey(item, step)
  if (!stepEditors.has(k)) {
    const editor = new Editor({
      content: step.content || '',
      extensions: buildExtensions(),
      onUpdate: ({ editor }) => {
        const idx = parseSteps(item).findIndex(s => s.id === step.id)
        if (idx !== -1) updateStepField(item, idx, 'content', editor.getHTML())
        stepEditorTick.value++
      },
      onTransaction: () => { stepEditorTick.value++ },
    })
    stepEditors.set(k, markRaw(editor))
  }
  return stepEditors.get(k)
}

const destroyStepEditor = (item, step) => {
  const k = stepEditorKey(item, step)
  stepEditors.get(k)?.destroy()
  stepEditors.delete(k)
}

const destroyAllStepEditors = () => {
  stepEditors.forEach(e => e.destroy())
  stepEditors.clear()
}

// ── image_path field upload (shared by items and the add-form) ─
// Keeps the raw File around (target._file) instead of converting to base64.
// A temporary local object URL (target._previewUrl) is used purely so the
// admin can preview the picture before hitting "save" — it is revoked and
// replaced with the real server value (relative path) once the upsert
// succeeds (see applyUploadResult below), and also revoked if the
// item/form is discarded. Display everywhere goes through resolveImageUrl().
const revokePreview = (target) => {
  if (target._previewUrl) {
    URL.revokeObjectURL(target._previewUrl)
    target._previewUrl = null
  }
}

const handleImageFieldUpload = (event, target) => {
  const file = event.target.files?.[0]
  event.target.value = ''
  if (!file) return
  if (!file.type.startsWith('image/')) {
    showToast('فایل انتخاب‌شده تصویر نیست', 'error')
    return
  }
  if (file.size > MAX_IMAGE_SIZE) {
    showToast('حجم تصویر نباید بیشتر از ۲ مگابایت باشد', 'error')
    return
  }

  revokePreview(target)
  target._file = file
  target._previewUrl = URL.createObjectURL(file)
  target.value = target._previewUrl // local preview only, replaced after save
}

// ── Fetch / normalize (key-value page content) ──────────────
const normalizeIncoming = (raw) => {
  let value = raw.value
  if (raw.type === 'json' && typeof value !== 'string') {
    try { value = JSON.stringify(value, null, 2) } catch { value = String(value) }
  }
  if (raw.type === 'boolean' && typeof value === 'string') {
    value = value === 'true' || value === '1'
  }
  return {
    ...raw,
    value,
    _saving: false,
    _deleting: false,
    _uploading: false,
    _editor: null,
    _editorTick: 0,
    _file: null,
    _previewUrl: null,
  }
}

const fetchItems = async (page) => {
  isLoading.value = true
  destroyAllItemEditors()
  destroyAllStepEditors()
  items.value.forEach(revokePreview)
  try {
    // GET is a public, read-only endpoint per the docs — no auth header here.
    // Sending Authorization would trigger a CORS preflight (OPTIONS) that
    // this backend currently rejects with 405.
    const res = await $fetch(`${API_BASE}/page/${page}`)
    // Backend wraps the array in { data: [...] } rather than returning it directly.
    const list = Array.isArray(res) ? res : (res?.data ?? [])
    items.value = list.map(normalizeIncoming)
    items.value.forEach(createEditorForItem)
  } catch (err) {
    showToast('خطا در دریافت محتوای این صفحه', 'error')
    items.value = []
  } finally {
    isLoading.value = false
  }
}

const selectPage = (slug) => {
  activePage.value = slug
  cancelAdd()
  confirmDeleteKey.value = null
  cancelAddService()
  confirmDeleteServiceId.value = null
}

const buildOutgoingValue = (type, value) => {
  if (type === 'json') {
    try {
      return JSON.parse(value)
    } catch {
      throw new Error('مقدار JSON نامعتبر است')
    }
  }
  return value
}

// Real write endpoint from the backend (Ali, 24 Tir):
// POST /api/admin/page  -> upserts by (page, key), creates if new, updates
// if that combo exists. Requires the admin bearer token.
// Response: { message, data: { id, key, value, type, page } }
//
// Two request shapes:
//  - file provided (new image_path upload)         -> multipart/form-data
//  - everything else (text/html/json/number/boolean,
//    or image_path where the admin only typed a URL) -> application/json
//
// Confirmed working (Ali): image uploads now save correctly. data.value
// comes back as a RELATIVE path (e.g. "pages/events/xxx.jpg"), not a full
// URL — see STORAGE_BASE / resolveImageUrl() above for how it's displayed.
const upsertPageItem = async ({ page, key, value, type, file }) => {
  let body

  if (type === 'image_path' && file) {
    const formData = new FormData()
    formData.append('page', page)
    formData.append('key', key)
    formData.append('type', type)
    formData.append('value', file) // raw file — NOT base64
    body = formData
    // Don't set Content-Type manually here: the browser needs to add the
    // multipart boundary itself. $fetch/ofetch already skips setting
    // Content-Type when body is a FormData instance.
  } else {
    body = { page, key, value, type }
  }

  const res = await $fetch(`${API_BASE}/admin/page`, {
    method: 'POST',
    headers: { ...authHeader() },
    body,
  })
  return res?.data ?? null
}

const deletePageItemRequest = async (id) => {
  return $fetch(`${API_BASE}/admin/page/${id}`, {
    method: 'DELETE',
    headers: { ...authHeader() },
  })
}

// After a successful upsert of an image_path item, swap the local preview
// object URL out for the real relative path the server returned. Display
// components always run this through resolveImageUrl() before use.
const applyUploadResult = (target, saved) => {
  revokePreview(target)
  target._file = null
  if (saved?.value) target.value = saved.value
}

const saveItem = async (item) => {
  item._saving = true
  try {
    const usingNewFile = item.type === 'image_path' && !!item._file
    const value = usingNewFile ? item.value : buildOutgoingValue(item.type, item.value)

    const saved = await upsertPageItem({
      page: activePage.value,
      key: item.key,
      value,
      type: item.type,
      file: item._file,
    })

    if (saved?.id) item.id = saved.id
    if (usingNewFile) applyUploadResult(item, saved)
    showToast(`«${item.key}» ذخیره شد`)
  } catch (err) {
    const raw = String(err?.data?.message || err?.message || '')
    if (item.type === 'image_path' && raw.includes('Data too long for column')) {
      showToast('حجم تصویر برای ذخیره خیلی زیاده.', 'error')
    } else {
      showToast(raw || 'ذخیره ناموفق بود', 'error')
    }
  } finally {
    item._saving = false
  }
}

// ── Delete (key-value item) ─────────────────────────────────
const confirmDeleteKey = ref(null) // item.id (or item.key as fallback) pending confirmation

const doDelete = async (item) => {
  item._deleting = true
  try {
    if (item.id) await deletePageItemRequest(item.id)
    destroyItemEditor(item)
    if (isWorkflowItem(item)) {
      parseSteps(item).forEach(step => destroyStepEditor(item, step))
    }
    revokePreview(item)
    items.value = items.value.filter(i => i !== item)
    showToast(`«${item.key}» حذف شد`)
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'حذف ناموفق بود'), 'error')
  } finally {
    item._deleting = false
    confirmDeleteKey.value = null
  }
}

// ── Add new item ─────────────────────────────────────────────
const showAddForm = ref(false)
const adding = ref(false)
const newItem = reactive({ key: '', type: 'text', value: '', _uploading: false, _file: null, _previewUrl: null })

const defaultValueForType = (type) => {
  if (type === 'boolean') return false
  if (type === 'number') return 0
  return ''
}

watch(() => newItem.type, (type) => {
  revokePreview(newItem)
  newItem._file = null
  newItem.value = defaultValueForType(type)
  if (type === 'html') ensureNewItemEditor()
  else destroyNewItemEditor()
})

const resetNewItem = () => {
  newItem.key = ''
  newItem.type = 'text'
  newItem.value = ''
  revokePreview(newItem)
  newItem._file = null
  destroyNewItemEditor()
}

const cancelAdd = () => {
  showAddForm.value = false
  resetNewItem()
}

const addItem = async () => {
  const key = newItem.key.trim()
  if (!key) {
    showToast('کلید (key) را وارد کنید', 'error')
    return
  }
  if (items.value.some(i => i.key === key)) {
    showToast('آیتمی با این کلید از قبل وجود دارد', 'error')
    return
  }

  adding.value = true
  try {
    const usingNewFile = newItem.type === 'image_path' && !!newItem._file
    const value = usingNewFile ? newItem.value : buildOutgoingValue(newItem.type, newItem.value)

    const saved = await upsertPageItem({
      page: activePage.value,
      key,
      value,
      type: newItem.type,
      file: newItem._file,
    })

    const pushed = normalizeIncoming(saved ?? { key, value, type: newItem.type, page: activePage.value })
    items.value.push(pushed)
    createEditorForItem(items.value[items.value.length - 1])

    showToast(`«${key}» اضافه شد`)
    cancelAdd()
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'افزودن آیتم ناموفق بود'), 'error')
  } finally {
    adding.value = false
  }
}

// ══════════════════════════════════════════════════════════════
// ── SERVICES (خدمات) — hierarchical, parent/children ──
//   GET    /api/services/tree              -> hierarchical tree (top-level + children)
//   POST   /api/admin/services             -> create   (TESTING — unconfirmed)
//   PUT    /api/admin/services/{id}        -> update   (TESTING — unconfirmed)
//   DELETE /api/admin/services/{id}        -> delete   (TESTING — unconfirmed), cascades to children
//
// Confirmed by testing against the live server:
//   - GET  /api/project-services/tree  -> does NOT work (fails to load)
//   - GET  /api/services/tree          -> works
//   - PUT  /api/services/{id}          -> 405, only GET/HEAD registered there
//   - PUT  /api/project-services/{id}  -> not yet confirmed working either
// So write ops are guessed at /admin/services/*, mirroring this project's
// own pattern for page content (public GET /page/{page}, admin write under
// /admin/page). This still needs to be confirmed with the backend dev —
// if /admin/services also 404s/405s, the real write route is unknown and
// must be provided by them.
// ══════════════════════════════════════════════════════════════

const servicesTree = ref([])
const isLoadingServices = ref(false)

const normalizeServiceNodes = (nodes, parentId = null) => (nodes || []).map(n => {
  const node = {
    ...n,
    parent_id: parentId,          // مشتق‌شده از ساختار درخت، نه فیلد خام API
    is_active: !!n.is_active,
    _saving: false,
    _deleting: false,
    _editor: null,
    _editorTick: 0,
  }
  node.children = n.children ? normalizeServiceNodes(n.children, n.id) : []
  return node
})

// Flattens the tree into { node, level } pairs for display — `node` stays
// a reference into servicesTree so editing/mutating it in the template
// stays reactive (no spread copy here, unlike normalizeServiceNodes above).
const flattenServiceNodes = (nodes, level = 0) => {
  let result = []
  for (const node of nodes) {
    result.push({ node, level })
    if (node.children?.length) {
      result = result.concat(flattenServiceNodes(node.children, level + 1))
    }
  }
  return result
}
const flatServiceEntries = computed(() => flattenServiceNodes(servicesTree.value))

// Only top-level services (no parent) are valid options in the "خدمت والد"
// dropdown — every other service must nest directly under one of these,
// not under an arbitrary sub-service.
const topLevelServiceOptions = computed(() => flatServiceEntries.value.filter(e => e.level === 0))

const createEditorForService = (node) => {
  if (node._editor) return
  const editor = new Editor({
    content: node.description || '',
    extensions: buildExtensions(),
    onUpdate: ({ editor }) => {
      node.description = editor.getHTML()
      node._editorTick++
    },
    onTransaction: () => { node._editorTick++ },
  })
  node._editor = markRaw(editor)
}

const destroyServiceEditor = (node) => {
  node._editor?.destroy()
  node._editor = null
}

const destroyAllServiceEditors = () => {
  flatServiceEntries.value.forEach(({ node }) => destroyServiceEditor(node))
}

const fetchServicesTree = async () => {
  isLoadingServices.value = true
  destroyAllServiceEditors()
  try {
    const res = await $fetch(`${API_BASE}/services/tree`)
    const list = res?.data?.services ?? []
    servicesTree.value = normalizeServiceNodes(list)
    flatServiceEntries.value.forEach(({ node }) => createEditorForService(node))
  } catch (err) {
    showToast('خطا در دریافت لیست خدمات', 'error')
    servicesTree.value = []
  } finally {
    isLoadingServices.value = false
  }
}

const saveService = async (node) => {
  node._saving = true
  try {
    const payload = {
      parent_id: node.parent_id ?? null,
      title: node.title,
      slug: node.slug,
      description: node.description,
      sort_order: node.sort_order,
      is_active: node.is_active,
    }
    const res = await $fetch(`${API_BASE}/admin/services/${node.id}`, {
      method: 'PUT',
      headers: { ...authHeader() },
      body: payload,
    })
    showToast(res?.message || `«${node.title}» به‌روزرسانی شد`)
    // Refetch: parent_id / sort_order changes can move the node within the
    // tree, so we rebuild from the server's authoritative structure.
    await fetchServicesTree()
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'به‌روزرسانی ناموفق بود'), 'error')
    node._saving = false
  }
}

const confirmDeleteServiceId = ref(null) // service.id pending delete confirmation

const doDeleteService = async (node) => {
  node._deleting = true
  try {
    await $fetch(`${API_BASE}/admin/services/${node.id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    })
    showToast(`«${node.title}» حذف شد`)
    confirmDeleteServiceId.value = null
    await fetchServicesTree() // cascade-deleted children come off the list too
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'حذف ناموفق بود'), 'error')
    node._deleting = false
  }
}

// ── Add new service ──────────────────────────────────────────
const showAddServiceForm = ref(false)
const addingService = ref(false)
const newService = reactive({
  parent_id: null,
  title: '',
  slug: '',
  description: '',
  sort_order: 1,
  is_active: true,
})

const newServiceEditorState = reactive({ editor: null, tick: 0 })

const ensureNewServiceEditor = () => {
  if (newServiceEditorState.editor) return
  const editor = new Editor({
    content: newService.description || '',
    extensions: buildExtensions(),
    onUpdate: ({ editor }) => {
      newService.description = editor.getHTML()
      newServiceEditorState.tick++
    },
    onTransaction: () => { newServiceEditorState.tick++ },
  })
  newServiceEditorState.editor = markRaw(editor)
}

const destroyNewServiceEditor = () => {
  newServiceEditorState.editor?.destroy()
  newServiceEditorState.editor = null
}

const openAddServiceForm = () => {
  showAddServiceForm.value = true
  ensureNewServiceEditor()
}

const cancelAddService = () => {
  showAddServiceForm.value = false
  newService.parent_id = null
  newService.title = ''
  newService.slug = ''
  newService.description = ''
  newService.sort_order = 1
  newService.is_active = true
  destroyNewServiceEditor()
}

const addService = async () => {
  const title = newService.title.trim()
  const slug = newService.slug.trim()
  if (!title || !slug) {
    showToast('عنوان و اسلاگ را وارد کنید', 'error')
    return
  }
  addingService.value = true
  try {
    const res = await $fetch(`${API_BASE}/admin/services`, {
      method: 'POST',
      headers: { ...authHeader() },
      body: {
        parent_id: newService.parent_id ?? null,
        title,
        slug,
        description: newService.description,
        sort_order: newService.sort_order,
        is_active: newService.is_active,
      },
    })
    showToast(res?.message || `«${title}» اضافه شد`)
    cancelAddService()
    await fetchServicesTree()
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'افزودن خدمت ناموفق بود'), 'error')
  } finally {
    addingService.value = false
  }
}

// ══════════════════════════════════════════════════════════════

watch(activePage, (page) => {
  if (page === 'services') fetchServicesTree()
  else fetchItems(page)
})

onMounted(() => {
  initFromStorage()
  if (activePage.value === 'services') fetchServicesTree()
  else fetchItems(activePage.value)
})

onBeforeUnmount(() => {
  destroyAllItemEditors()
  destroyAllStepEditors()
  destroyNewItemEditor()
  items.value.forEach(revokePreview)
  revokePreview(newItem)

  destroyAllServiceEditors()
  destroyNewServiceEditor()
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>

<style>
.prosemirror-wrap .ProseMirror { outline: none; }
.prosemirror-wrap .ProseMirror p { margin: 0.4em 0; }
.prosemirror-wrap .ProseMirror img { max-width: 100%; border-radius: 8px; }
.prosemirror-wrap .ProseMirror a { color: #2C7379; text-decoration: underline; }
.prosemirror-wrap .ProseMirror blockquote {
  border-right: 3px solid #67A9A8;
  padding-right: 10px;
  margin: 0.5em 0;
  color: #6b7280;
}
</style>