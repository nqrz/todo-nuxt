<template>
  <div class="py-3 px-4 mx-2 md:mx-0 mb-3 border-2 border-red-700 dark:border-red-500 rounded-md">
    <p class="text-xs text-red-700 dark:text-red-500">
      <i class="fas fa-exclamation mr-1"></i> 
      <slot />
    </p>
  </div>
</template>