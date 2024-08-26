<template>
    <button v-if="classList !== 'file'" :class="classList">
      <slot></slot>
    </button>
    <button v-else class="btn_wrapper">
      <div :class="classList">
        <slot></slot>
      </div>
    </button>
  </template>
  
  <script>
  export default {
    props: {
      classList: String,
      type: String | null,
    },
  };
  </script>
  
  <style lang="scss" scoped>
  button {
    cursor: pointer;
    padding: 10px 25px;
    background: #ffc7ed;
    background: linear-gradient(90deg, #a0fffd, #ffc7ed, #a0fffd);
    color: #e0479f;
    transition: all 1s;
    border: none;
    font-size: 1.4em;
    margin: auto 0;
    @media (max-width: 768px) {
        font-size: 0.8em;
    }
    &:hover {
        transition: all 1s;
        background-position: 50px;
        color: #922162;
    }
    &.btn_wrapper {
        padding: 5px;
        .file {
        padding: 10px 15px;
        background: #fff;
        }
        span {
        margin: 0 5px;
        }
    }
    }
  </style>
  