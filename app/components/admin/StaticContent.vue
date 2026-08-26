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

    <!-- Read-only banner -->
    <div
      v-if="isReadOnly"
      class="mx-5 lg:mx-8 mb-2 px-4 py-2.5 rounded-xl text-[13px] font-bold bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800/50"
    >
      شما دسترسی فقط-خواندنی دارید و امکان ایجاد، ویرایش یا حذف محتوا را ندارید.
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
      <!-- توجه: این تب عمداً از RichTextEditor استفاده نمی‌کند چون متن توضیحات خدمات کوتاه است -->
      <template v-if="activePage === 'services'">

        <!-- Add new service toggle -->
        <div class="mb-4 flex justify-end">
          <button
            v-if="!showAddServiceForm"
            @click="openAddServiceForm"
            :disabled="isReadOnly"
            class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            <button @click="cancelAddService" class="text-[12px] text-[#454C6A]/70 dark:text-white hover:underline">انصراف</button>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">عنوان (فارسی)</label>
                <input
                  v-model="newService.title"
                  type="text"
                  placeholder="مثلاً طراحی وبسایت"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
              <div class="flex-1">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">Title (English)</label>
                <input
                  v-model="newService.title_en"
                  type="text"
                  dir="ltr"
                  placeholder="e.g. Website Design"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
            </div>

            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">اسلاگ (slug)</label>
                <input
                  v-model="newService.slug"
                  type="text"
                  dir="ltr"
                  placeholder="web-design"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
              <div class="flex-1">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">خدمت والد (اختیاری)</label>
                <select
                  v-model="newService.parent_id"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                >
                  <option class="text-black" :value="null">—  (خدمت اصلی) —</option>
                  <option class="text-black" v-for="entry in topLevelServiceOptions" :key="entry.node.id" :value="entry.node.id">
                    {{ entry.node.title || '(بدون عنوان)' }}
                  </option>
                </select>
              </div>
              <div class="w-full sm:w-40">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">ترتیب نمایش</label>
                <input
                  v-model.number="newService.sort_order"
                  type="number"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
            </div>

            <div>
              <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">توضیحات (فارسی)</label>
              <textarea
                v-model="newService.description"
                rows="4"
                placeholder="توضیح کوتاه خدمت..."
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
            </div>

            <div>
              <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">Description (English)</label>
              <textarea
                v-model="newService.description_en"
                rows="4"
                dir="ltr"
                placeholder="English description..."
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
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
              </button>

              <button
                @click="addService"
                :disabled="addingService || isReadOnly"
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
              </div>

              <div class="flex items-center gap-2 shrink-0">
                <template v-if="confirmDeleteServiceId === entry.node.id">
                  <button
                    @click="doDeleteService(entry.node)"
                    :disabled="entry.node._deleting || isReadOnly"
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
                    :disabled="entry.node._saving || isReadOnly"
                    class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
                  >
                    {{ entry.node._saving ? '...' : 'ذخیره' }}
                  </button>
                  <button
                    @click="confirmDeleteServiceId = entry.node.id"
                    :disabled="isReadOnly"
                    class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                  >
                    حذف
                  </button>
                </template>
              </div>
            </div>

            <div class="flex flex-col gap-3">
              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">عنوان (فارسی)</label>
                  <input
                    v-model="entry.node.title"
                    type="text"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">Title (English)</label>
                  <input
                    v-model="entry.node.title_en"
                    type="text"
                    dir="ltr"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">اسلاگ</label>
                  <input
                    v-model="entry.node.slug"
                    type="text"
                    dir="ltr"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">خدمت والد</label>
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
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">ترتیب نمایش</label>
                  <input
                    v-model.number="entry.node.sort_order"
                    type="number"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                </div>
              </div>

              <div class="flex flex-col sm:flex-row gap-3">
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">توضیحات (فارسی)</label>
                  <textarea
                    v-model="entry.node.description"
                    rows="3"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
                  />
                </div>
                <div class="flex-1">
                  <label class="block text-[11px] text-[#454C6A]/70 dark:text-white mb-1">Description (English)</label>
                  <textarea
                    v-model="entry.node.description_en"
                    rows="3"
                    dir="ltr"
                    class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- ══════════════════ KEY-VALUE PAGE CONTENT (about / events / order) ══════════════════ -->
      <!-- این سه تب همگی برای فیلدهای نوع html از RichTextEditor استفاده می‌کنند -->
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
                :disabled="isReadOnly"
                class="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-[11px] font-bold hover:bg-amber-200 dark:hover:bg-amber-900/50 transition shrink-0 disabled:opacity-50"
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
            :disabled="isReadOnly"
            class="px-4 py-2 rounded-full bg-[#0F184B] dark:bg-dark-accent text-white text-[12px] font-bold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
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
            <span class="font-bold text-[#000000] dark:text-white text-[14px]">آیتم جدید در «{{ activePageLabel }}»</span>
            <button @click="cancelAdd" class="text-[12px] text-[#454C6A]/70 dark:text-white hover:underline">انصراف</button>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex flex-col sm:flex-row gap-3">
              <div class="flex-1">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">کلید (key)</label>
                <input
                  v-model="newItem.key"
                  type="text"
                  placeholder="مثلاً service_1_image"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />
              </div>
              <div class="w-full sm:w-48">
                <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">نوع (type)</label>
                <select
                  v-model="newItem.type"
                  class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                >
                  <option class="text-black" value="text">متن</option>
                  <option class="text-black" value="html">HTML</option>
                  <option class="text-black" value="image_path">تصویر</option>
                  <option class="text-black" value="json">JSON</option>
                  <option class="text-black" value="number">عدد</option>
                  <option class="text-black" value="boolean">بولین</option>
                </select>
              </div>
            </div>

            <div>
              <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">مقدار فارسی (value)</label>

              <!-- text / html: RichTextEditor -->
              <RichTextEditor
                v-if="newItem.type === 'text' || newItem.type === 'html'"
                v-model="newItem.value"
                dir="rtl"
                :height="newItem.type === 'html' ? '200px' : '120px'"
                :disabled="isReadOnly"
              />

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
                    :class="{ 'opacity-50 pointer-events-none': newItem._uploading || isReadOnly }"
                  >
                    {{ newItem._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
                    <input type="file" accept="image/*" class="hidden" :disabled="newItem._uploading || isReadOnly" @change="handleImageFieldUpload($event, newItem)" />
                  </label>
                  <span v-if="newItem._file" class="text-[11px] text-[#454C6A]/70 dark:text-white">
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
            </div>

            <!-- نسخه انگلیسی (JSON) -->
            <div v-if="newItem.type === 'json'">
              <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">English value (اختیاری — با کلید «{{ (newItem.key || 'key') + '_en' }}» ذخیره می‌شود)</label>
              <textarea
                v-model="newItem.value_en"
                rows="5"
                dir="ltr"
                spellcheck="false"
                placeholder="English JSON..."
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
            </div>

            <!-- نسخه انگلیسی (متن / HTML): RichTextEditor -->
            <div v-else-if="newItem.type === 'text' || newItem.type === 'html'">
              <label class="block text-[11px] text-[#0F184B] dark:text-white mb-1">English value (اختیاری — با کلید «{{ (newItem.key || 'key') + '_en' }}» ذخیره می‌شود)</label>
              <RichTextEditor
                v-model="newItem.value_en"
                dir="ltr"
                :height="newItem.type === 'html' ? '200px' : '120px'"
                :disabled="isReadOnly"
              />
            </div>

            <div class="flex justify-end">
              <button
                @click="addItem"
                :disabled="adding || isReadOnly"
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
                    :disabled="item._deleting || isReadOnly"
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
                    :disabled="item._saving || isReadOnly"
                    class="px-3 py-1.5 rounded-full bg-[#67A9A8] dark:bg-dark-accent text-[#0F184B] dark:text-white text-[12px] font-bold hover:bg-[#8FB0B2] dark:hover:bg-dark-accent-hover transition disabled:opacity-50"
                  >
                    {{ item._saving ? '...' : 'ذخیره' }}
                  </button>
                  <button
                    @click="confirmDeleteKey = item.id ?? item.key"
                    :disabled="isReadOnly"
                    class="px-3 py-1.5 rounded-full border border-red-300 dark:border-red-800/50 text-red-500 dark:text-red-400 text-[12px] font-bold hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-50"
                  >
                    حذف
                  </button>
                </template>
              </div>
            </div>

            <!-- text / html: RichTextEditor (فارسی + انگلیسی) -->
            <template v-if="item.type === 'text' || item.type === 'html'">
              <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1">فارسی</label>
              <RichTextEditor
                v-model="item.value"
                dir="rtl"
                :height="item.type === 'html' ? '200px' : '120px'"
                :disabled="isReadOnly"
              />

              <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1 mt-2">English</label>
              <RichTextEditor
                v-model="item.value_en"
                dir="ltr"
                :height="item.type === 'html' ? '200px' : '120px'"
                :disabled="isReadOnly"
              />
            </template>

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
                      :disabled="idx === 0 || isReadOnly"
                      class="w-6 h-6 rounded-full text-[12px] text-[#454C6A] dark:text-white/70 hover:bg-gray-200 dark:hover:bg-dark-input disabled:opacity-30 transition"
                    >↑</button>
                    <button
                      type="button"
                      @click="moveStep(item, idx, 1)"
                      :disabled="idx === parseSteps(item).length - 1 || isReadOnly"
                      class="w-6 h-6 rounded-full text-[12px] text-[#454C6A] dark:text-white/70 hover:bg-gray-200 dark:hover:bg-dark-input disabled:opacity-30 transition"
                    >↓</button>
                    <button
                      type="button"
                      @click="removeStep(item, idx)"
                      :disabled="isReadOnly"
                      class="w-6 h-6 rounded-full text-[12px] text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition disabled:opacity-30"
                    >×</button>
                  </div>
                </div>

                <input
                  :value="step.title"
                  @input="updateStepField(item, idx, 'title', $event.target.value)"
                  type="text"
                  placeholder="عنوان مرحله (فارسی)"
                  class="w-full mb-2 px-3 py-1.5 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] font-bold text-[#0F184B] dark:text-white focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                />

                <!-- content: RichTextEditor -->
                <RichTextEditor
                  :model-value="step.content"
                  dir="rtl"
                  height="120px"
                  :disabled="isReadOnly"
                  class="mb-2"
                  @update:model-value="val => updateStepField(item, idx, 'content', val)"
                />

                <!-- نسخه انگلیسی مرحله -->
                <div class="mt-2 pt-2 border-t border-dashed border-[#BFD1D5] dark:border-dark-border">
                  <input
                    :value="step.title_en"
                    @input="updateStepField(item, idx, 'title_en', $event.target.value)"
                    type="text"
                    dir="ltr"
                    placeholder="Step title (English)"
                    class="w-full mb-2 px-3 py-1.5 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[13px] font-bold text-[#0F184B] dark:text-white font-roboto focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent bg-white/20"
                  />
                  <RichTextEditor
                    :model-value="step.content_en"
                    dir="ltr"
                    height="120px"
                    :disabled="isReadOnly"
                    @update:model-value="val => updateStepField(item, idx, 'content_en', val)"
                  />
                </div>
              </div>

              <button
                type="button"
                @click="addStep(item)"
                :disabled="isReadOnly"
                class="px-3 py-2 rounded-lg border-2 border-dashed border-[#67A9A8]/60 dark:border-dark-accent/60 text-[#2C7379] dark:text-dark-highlight text-[12px] font-bold hover:bg-[#67A9A8]/10 dark:hover:bg-dark-accent/10 transition disabled:opacity-50"
              >
                + افزودن مرحله
              </button>
            </div>

            <!-- json -->
            <template v-else-if="item.type === 'json'">
              <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1">فارسی</label>
              <textarea
                v-model="item.value"
                rows="5"
                spellcheck="false"
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
              <label class="block text-[10px] text-[#454C6A]/60 dark:text-white/50 mb-1 mt-2">English</label>
              <textarea
                v-model="item.value_en"
                rows="5"
                dir="ltr"
                spellcheck="false"
                placeholder='["Question 1?", "Question 2?"]'
                class="w-full px-3 py-2 rounded-lg border border-[#BFD1D5] dark:border-dark-border dark:bg-dark-input/20 text-[12px] text-[#0F184B] dark:text-white font-mono focus:outline-none focus:border-[#67A9A8] dark:focus:border-dark-accent resize-y bg-white/20"
              />
            </template>

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
                  :class="{ 'opacity-50 pointer-events-none': item._uploading || isReadOnly }"
                >
                  {{ item._uploading ? 'در حال آماده‌سازی فایل...' : 'آپلود از سیستم' }}
                  <input type="file" accept="image/*" class="hidden" :disabled="item._uploading || isReadOnly" @change="handleImageFieldUpload($event, item)" />
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
import { ref, reactive, computed, onMounted, onBeforeUnmount, watch } from 'vue'
import RichTextEditor from '~/components/tiptap/RichTextEditor.vue'

const API_BASE = 'https://nadertechnologyteam.ir/api'
const STORAGE_BASE = 'https://nadertechnologyteam.ir/storage/'
const MAX_IMAGE_SIZE = 2 * 1024 * 1024 // 2MB

const resolveImageUrl = (value) => {
  if (!value) return value
  if (/^(https?:|blob:|data:)/.test(value)) return value
  return STORAGE_BASE + value.replace(/^\/+/, '')
}

const { authHeader, initFromStorage } = useAdminAuth()
const { isReadOnly } = useAdminPermissions()

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

const quickAddServiceImage = (n) => {
  if (isReadOnly.value) return
  showAddForm.value = true
  newItem.key = `service_${n}_image`
  newItem.type = 'image_path'
  newItem.value = ''
}

// ── image_path field upload ──────────────────────────────────
const revokePreview = (target) => {
  if (target._previewUrl) {
    URL.revokeObjectURL(target._previewUrl)
    target._previewUrl = null
  }
}

const handleImageFieldUpload = (event, target) => {
  if (isReadOnly.value) return
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
  target.value = target._previewUrl
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
    value_en: '',
    _enId: null,
    _saving: false,
    _deleting: false,
    _uploading: false,
    _file: null,
    _previewUrl: null,
  }
}

const fetchItems = async (page) => {
  isLoading.value = true
  items.value.forEach(revokePreview)
  try {
    const res = await $fetch(`${API_BASE}/page/${page}`)
    const list = Array.isArray(res) ? res : (res?.data ?? [])
    const normalized = list.map(normalizeIncoming)

    // آیتم‌هایی که کلیدشون به «_en» ختم میشه، نسخه‌ی انگلیسیِ یه آیتم دیگه‌ن؛
    // اینجا جداشون می‌کنیم و به آیتم فارسیِ متناظرشون می‌چسبونیم، تا توی
    // لیست به‌صورت یک کارت با دو فیلد (فارسی/انگلیسی) دیده بشن، نه دو ردیف جدا
    const enMap = new Map()
    const baseItems = []
    normalized.forEach((it) => {
      if (it.key.endsWith('_en')) {
        enMap.set(it.key.slice(0, -3), it)
      } else {
        baseItems.push(it)
      }
    })
    baseItems.forEach((it) => {
      const enItem = enMap.get(it.key)
      if (enItem) {
        it.value_en = enItem.value ?? ''
        it._enId = enItem.id ?? null
      }
    })

    items.value = baseItems
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

const upsertPageItem = async ({ page, key, value, type, file }) => {
  let body

  if (type === 'image_path' && file) {
    const formData = new FormData()
    formData.append('page', page)
    formData.append('key', key)
    formData.append('type', type)
    formData.append('value', file)
    body = formData
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

const applyUploadResult = (target, saved) => {
  revokePreview(target)
  target._file = null
  if (saved?.value) target.value = saved.value
}

const saveItem = async (item) => {
  if (isReadOnly.value) return
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

    // نسخه‌ی انگلیسی (فقط برای text/html) - با کلید «key_en» ذخیره می‌شه
    if ((item.type === 'text' || item.type === 'html' || item.type === 'json') && item.value_en?.trim()) {
      const valueEn = item.type === 'json' ? buildOutgoingValue(item.type, item.value_en) : item.value_en
      const savedEn = await upsertPageItem({
        page: activePage.value,
        key: `${item.key}_en`,
        value: valueEn,
        type: item.type,
      })
      if (savedEn?.id) item._enId = savedEn.id
    }

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
const confirmDeleteKey = ref(null)

const doDelete = async (item) => {
  if (isReadOnly.value) return
  item._deleting = true
  try {
    if (item.id) await deletePageItemRequest(item.id)
    if (item._enId) await deletePageItemRequest(item._enId) // نسخه‌ی انگلیسی هم حذف بشه
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
const newItem = reactive({ key: '', type: 'text', value: '', value_en: '', _uploading: false, _file: null, _previewUrl: null })

const defaultValueForType = (type) => {
  if (type === 'boolean') return false
  if (type === 'number') return 0
  return ''
}

watch(() => newItem.type, (type) => {
  revokePreview(newItem)
  newItem._file = null
  newItem.value = defaultValueForType(type)
  newItem.value_en = ''
})

const resetNewItem = () => {
  newItem.key = ''
  newItem.type = 'text'
  newItem.value = ''
  newItem.value_en = ''
  revokePreview(newItem)
  newItem._file = null
}

const cancelAdd = () => {
  showAddForm.value = false
  resetNewItem()
}

const addItem = async () => {
  if (isReadOnly.value) return
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

    // نسخه‌ی انگلیسی (فقط برای text/html)
    if ((newItem.type === 'text' || newItem.type === 'html' || newItem.type === 'json') && newItem.value_en?.trim()) {
      const valueEn = newItem.type === 'json' ? buildOutgoingValue(newItem.type, newItem.value_en) : newItem.value_en
      const savedEn = await upsertPageItem({
        page: activePage.value,
        key: `${key}_en`,
        value: valueEn,
        type: newItem.type,
      })
      pushed.value_en = newItem.value_en
      pushed._enId = savedEn?.id ?? null
    }

    items.value.push(pushed)

    showToast(`«${key}» اضافه شد`)
    cancelAdd()
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'افزودن آیتم ناموفق بود'), 'error')
  } finally {
    adding.value = false
  }
}

// ══════════════════════════════════════════════════════════════
// ── Workflow (order page) steps ──────────────────────────────
// ══════════════════════════════════════════════════════════════

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
  if (isReadOnly.value) return
  const steps = parseSteps(item)
  if (!steps[index]) return
  steps[index] = { ...steps[index], [field]: val }
  writeSteps(item, steps)
}

const addStep = (item) => {
  if (isReadOnly.value) return
  const steps = parseSteps(item)
  const nextId = steps.length ? Math.max(...steps.map(s => Number(s.id) || 0)) + 1 : 1
  // title_en / content_en هم از همون ابتدا روی هر مرحله وجود دارن
  steps.push({ id: nextId, title: '', content: '', title_en: '', content_en: '' })
  writeSteps(item, steps)
}

const removeStep = (item, index) => {
  if (isReadOnly.value) return
  const steps = parseSteps(item)
  steps.splice(index, 1)
  writeSteps(item, steps)
}

const moveStep = (item, index, dir) => {
  if (isReadOnly.value) return
  const steps = parseSteps(item)
  const target = index + dir
  if (target < 0 || target >= steps.length) return
  ;[steps[index], steps[target]] = [steps[target], steps[index]]
  writeSteps(item, steps)
}

// ══════════════════════════════════════════════════════════════
// ── SERVICES (خدمات) — hierarchical, parent/children ──
// (عمداً بدون RichTextEditor، متن توضیحات کوتاهه)
// ══════════════════════════════════════════════════════════════

const servicesTree = ref([])
const isLoadingServices = ref(false)

const normalizeServiceNodes = (nodes, parentId = null) => (nodes || []).map(n => {
  const node = {
    ...n,
    parent_id: parentId,
    title_en: n.title_en || '',
    description_en: n.description_en || '',
    is_active: !!n.is_active,
    _saving: false,
    _deleting: false,
  }
  node.children = n.children ? normalizeServiceNodes(n.children, n.id) : []
  return node
})

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

const topLevelServiceOptions = computed(() => flatServiceEntries.value.filter(e => e.level === 0))

const fetchServicesTree = async () => {
  isLoadingServices.value = true
  try {
    const res = await $fetch(`${API_BASE}/services/tree`)
    const list = res?.data?.services ?? []
    servicesTree.value = normalizeServiceNodes(list)
  } catch (err) {
    showToast('خطا در دریافت لیست خدمات', 'error')
    servicesTree.value = []
  } finally {
    isLoadingServices.value = false
  }
}

const saveService = async (node) => {
  if (isReadOnly.value) return
  node._saving = true
  try {
    const payload = {
      parent_id: node.parent_id ?? null,
      title: node.title,
      title_en: node.title_en,
      slug: node.slug,
      description: node.description,
      description_en: node.description_en,
      sort_order: node.sort_order,
      is_active: node.is_active,
    }
    const res = await $fetch(`${API_BASE}/admin/services/${node.id}`, {
      method: 'PUT',
      headers: { ...authHeader() },
      body: payload,
    })
    showToast(res?.message || `«${node.title}» به‌روزرسانی شد`)
    await fetchServicesTree()
  } catch (err) {
    showToast(String(err?.data?.message || err?.message || 'به‌روزرسانی ناموفق بود'), 'error')
    node._saving = false
  }
}

const confirmDeleteServiceId = ref(null)

const doDeleteService = async (node) => {
  if (isReadOnly.value) return
  node._deleting = true
  try {
    await $fetch(`${API_BASE}/admin/services/${node.id}`, {
      method: 'DELETE',
      headers: { ...authHeader() },
    })
    showToast(`«${node.title}» حذف شد`)
    confirmDeleteServiceId.value = null
    await fetchServicesTree()
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
  title_en: '',
  slug: '',
  description: '',
  description_en: '',
  sort_order: 1,
  is_active: true,
})

const openAddServiceForm = () => {
  if (isReadOnly.value) return
  showAddServiceForm.value = true
}

const cancelAddService = () => {
  showAddServiceForm.value = false
  newService.parent_id = null
  newService.title = ''
  newService.title_en = ''
  newService.slug = ''
  newService.description = ''
  newService.description_en = ''
  newService.sort_order = 1
  newService.is_active = true
}

const addService = async () => {
  if (isReadOnly.value) return
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
        title_en: newService.title_en,
        slug,
        description: newService.description,
        description_en: newService.description_en,
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
  items.value.forEach(revokePreview)
  revokePreview(newItem)
})
</script>

<style scoped>
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>