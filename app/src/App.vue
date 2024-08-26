<template>
  <root />
</template>

<script setup lang="ts">
import './styles.scss';

import { Root } from '@tok/generation';
</script>

<style>
html[data-theme="dark"] body {
  background-color:rgb(15 15 16)!important;
}
input:focus,
textarea:focus {
  outline: none;
}
</style>