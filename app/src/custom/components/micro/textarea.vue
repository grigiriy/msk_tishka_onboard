<template>
    <span class="textarea">
        <label :for="type">{{ placeholder }}</label>
        <textarea :id="type" ></textarea>
    </span>
</template>

<script>
export default {
    props: {
        placeholder: String,
        type: String,
    },
};
</script>

<style lang="scss" scoped>
span.textarea {
    display: block;

    * {
        font-family: Alice;
    }

    textarea {
        margin: 20px 0 30px;
        width: 100%;
        border-top: none;
        border-left: none;
        border-right: none;
        padding: 10px 0;
    }

    label {
        color: #bbbfc4;
        text-transform: lowercase;
        position: absolute;
    }
}
</style>