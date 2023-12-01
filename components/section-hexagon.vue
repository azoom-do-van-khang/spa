<template>
    <div class="section">
        <div class="container">
            <div class="column1" >
                <div class="hexagon" v-for="slot in array1">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
            <div class="column2">
                <div class="hexagon" v-for="slot in array2">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
            <div class="column3">
                <div class="hexagon" v-for="slot in array3">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
             <div class="column4">
                <div class="hexagon" v-for="slot in array4">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
            <div class="column5">
                <div class="hexagon" v-for="slot in array5">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
            <div class="column6">
                <div class="hexagon" v-for="slot in array6">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
            <div class="column7">
                <div class="hexagon" v-for="slot in array7">
                    <hexagon :background-color="slot.backgroundColor"/>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="js">
const props = defineProps({
    array2D: {
        type: Object,
    },
})

const array1 = computed(() => props.array2D.array1)
const array2 = computed(() => props.array2D.array2)
const array3 = computed(() => props.array2D.array3)
const array4 = computed(() => props.array2D.array4)
const array5 = computed(() => props.array2D.array5)
const array6 = computed(() => props.array2D.array6)
const array7 = computed(() => props.array2D.array7)
</script>
<style lang="scss" scoped>
.container {
    display: flex;
    position: relative;

    > .column7 {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        top: 86px;
        left: 272px;
    }

    > .column6 {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        top: 63px;
        left: 232px;
    }
    > .column5 {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        top: 39px;
        left: 192px;
    }
    > .column4 {
        display: flex;
        flex-direction: column;
        gap: 2px;
        position: absolute;
        top: 17px;
        left: 151px;
    }
    > .column3 {
        position: absolute;
        top: 39px;
        left: 110px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
    > .column2 {
        position: absolute;
        top: 62px;
        left: 69px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    > .column1 {
        position: absolute;
        top: 85px;
        left: 29px;
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
}
</style>
