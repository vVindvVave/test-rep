<script src="./dropdown.js"></script>

<style src="./dropdown.scss"></style>

<template>
  <div class="dropdown"
       :class="{_open: isOpen}"
  >

    <div class="dropdown__head"
         @click="isOpen = !isOpen"
    >
      <div class="dropdown__head__text">{{ headText }}</div>
      <input type="hidden" :name="name" :value="headText">
    </div>

    <div class="dropdown__body">

      <div v-if="all"
           class="dropdown__body__item"
           :class="{_active: activeItems.includes(all)}"
           @click="onItemClickAll"
      >
        <div class="dropdown__body__item__icon"></div>
        <div class="dropdown__body__item__text">{{ all }}</div>
      </div>

      <div class="dropdown__body__scroll-wrap">

        <div class="dropdown__body__item"
             v-for="item in items"
             :class="{_active: activeItems.includes(item)}"
             @click="onItemClick(item)"
        >
          <div class="dropdown__body__item__icon"></div>
          <div class="dropdown__body__item__text">{{ item }}</div>
        </div>

      </div>

    </div>
  </div>
</template>