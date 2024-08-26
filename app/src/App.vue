<template>
  <root />
</template>

<script setup lang="ts">
import './styles.scss';

import { Root } from '@tok/generation';

if(
  !Telegram.WebApp.initDataUnsafe.user
){return false}
</script>

<style>
html[data-theme="dark"] body {
  background-color:rgb(15 15 16)!important;
}
input:focus {
  outline: none;
}
</style>