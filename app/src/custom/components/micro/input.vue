<template>
    <span class="input">
        <label :for="type">{{ placeholder }}</label>
        <input :id="type" :value="val"/>
    </span>
</template>

<script>
export default {
    props: {
        placeholder: String,
        type: String,
        val: String | null,
    },
};
</script>

<style lang="scss" scoped>
span.input {
    display: block;

    * {
        font-family: Alice;
    }

    input {
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