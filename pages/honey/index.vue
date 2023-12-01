<template>
    <button @click="spin">Spin</button>
    <div class="define">
        <div>
            <h4>BACKGROUND COLOR có index tưong ứng với index của Slot:</h4>
                <p>0: 'green',</p>
                <p>1: 'red',</p>
                <p>2: 'blue',</p>
                <p>3: 'yellow',</p>
                <p>4: 'pink',</p>
                <p>5: 'orange',</p>
                <p>6: 'purple',</p>
                <p>7: 'brown',</p>
                <p>100: 'black', wild x1</p>
                <p>200: 'lightblue', wild x2</p>
                <p>300: 'gray', wild x3</p>
        </div>
        <div>
            <h4>RESULT SPIN</h4>
            <div>Total money: {{ containerDataShow[containerDataShow.length -1]?.totalMoneyWin }}</div>
            <div>Total slot win: {{ containerDataShow[containerDataShow.length -1]?.totalSlotWin }}</div>
        </div>
    </div>

    <div class="honey-game">
        <div class="hexagon" v-for="container in containerDataShow">
            <section-hexagon :array2D="container.array2DStart"></section-hexagon>
            <section-hexagon :array2D="container.array2DEnd"></section-hexagon>
            <div class="information">
                <div class="chain-win">
                    <div class="chain" v-for="chain in container.chainWin">
                        <span>length: {{  chain.length }}  |  type: {{ backgroundColor[chain.type.trim()] }} {{ chain.wild ?'x' + chain.wild : '' }}  |  money: {{ chain.money }}</span>
                    </div>
                </div>
                <div class="money-win">
                    <span>Money Win: {{ container.moneyWin }}</span>
                </div>
                 <div class="total-money-win">
                    <span>total money Win: {{ container.totalMoneyWin }}</span>
                </div>
                <div class="total-slot-win">
                    <span>Total Slot Win: {{ container.totalSlotWin }}</span>
                </div>
                <div class="event-trigger">
                    <span>Event Trigger: {{ container.eventTrigger  ?? "NO"}}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="js">
const backgroundColor = {
    0: 'green',
    1: 'red',
    2: 'blue',
    3: 'yellow',
    4: 'pink',
    5: 'orange',
    6: 'purple',
    7: 'brown',
    100: 'black',
    200: 'lightblue',
    300: 'gray',
}

const containerDataFetch = ref(null)
const containerDataShow = ref([])

const mapArray = (start, end, array2d) => {
    return array2d.split(',').map(item => Number(item)).slice(start, end).map(
        (item, index) => {
            return {
                backgroundColor: backgroundColor[item],
                key: item
            }
        }
    ).reverse()
}

const formatDataShow = (dataShow) => {
    const container = {
        array2DStart: {
            array1: [],
            array2: [],
            array3: [],
            array4: [],
            array5: [],
            array6: [],
            array7: [],
        },
        array2DEnd: {
            array1: [],
            array2: [],
            array3: [],
            array4: [],
            array5: [],
            array6: [],
            array7: [],
        },
        chainWin: [],
        moneyWin: 0,
        totalSlotWin: 0,
        eventTrigger: '',
        totalMoneyWin: 0,
    }
    const { array2d_start, chain_win, event_trigger, money_win, total_money_win, total_slot_win, array2d_end } = dataShow

    const sliceIndexes = [[0, 4], [4, 9], [9, 15], [15, 22], [22, 28], [28, 33], [33, 37]]

    const array2dStartFormat = sliceIndexes.map(([start, end]) => mapArray(start, end, array2d_start))
    const array2dStart = {
        array1: array2dStartFormat[0],
        array2: array2dStartFormat[1],
        array3: array2dStartFormat[2],
        array4: array2dStartFormat[3],
        array5: array2dStartFormat[4],
        array6: array2dStartFormat[5],
        array7: array2dStartFormat[6],
    }

    const array2dEndFormat = sliceIndexes.map(([start, end]) => mapArray(start, end, array2d_end))
    const array2dEnd = {
        array1: array2dEndFormat[0],
        array2: array2dEndFormat[1],
        array3: array2dEndFormat[2],
        array4: array2dEndFormat[3],
        array5: array2dEndFormat[4],
        array6: array2dEndFormat[5],
        array7: array2dEndFormat[6],
    }

    const chainWin = chain_win.split(';').map(item => {
        const [index, length, type, money, wild] = item.split('-').map(item => item.trim())
        return {
            index: index.split(':')[1],
            length: length.split(':')[1],
            type: type.split(':')[1],
            money: money.split(':')[1],
            wild: wild.split(':')[1] ?? '',
        }
    })

    container.array2DStart = array2dStart
    container.array2DEnd = array2dEnd
    container.chainWin = chainWin
    container.moneyWin = money_win
    container.totalSlotWin = total_slot_win
    container.eventTrigger = event_trigger
    container.totalMoneyWin = total_money_win

    return container
}

const spin = async () => {
    const { data, error } = await useFetch('http://45.77.47.97:8080/v1/honey-rush/spin?money=100')
    containerDataFetch.value = data.value
}

watch(containerDataFetch, (data) => {
    containerDataShow.value = []
    containerDataShow.value = containerDataFetch.value.map(item => {
        return formatDataShow(item)
    })
    console.log(containerDataShow.value)
}, { deep: true })
</script>

<style lang="scss" scoped>
.define {
    display: flex;
    gap: 100px;
    p {
        margin: 0;
    }
}
.honey-game {
    display: flex;
    flex-direction: column;
    gap: 150px;

    >.hexagon {
        display: flex;
        gap: 350px;
        > .information {
            display: flex;
            flex-direction: column;
            margin-top: 130px;
        }
    }
}
</style>

