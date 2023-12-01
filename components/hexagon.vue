<template>
    <div ref="hexagon" class="hexagon"></div>
</template>
<script setup>
const props = defineProps({
  backgroundColor: {
    type: String,
    default: 'black'
  }
})

const hexagon = ref(null)

onMounted(() => {
  const hexagonElement = hexagon.value
  hexagonElement.style.backgroundColor = props.backgroundColor
})

watch(() => props.backgroundColor, () => {
  const hexagonElement = hexagon.value
  hexagonElement.style.backgroundColor = props.backgroundColor
})


</script>
<style lang="scss" scoped>
.hexagon{
	width: 50px;
	height: 44px; /* width*√3/2 */
	clip-path: polygon(25% 0, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
}
</style>
