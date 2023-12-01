

<script setup lang="ts">
const user = {
  departmentId: 2
}

interface QuestionType {
  id: number,
  content: string,
  nextStep: number[]
  type: string,
  url?: string
}

const departments = [
  {
    ids: [2, 21, 22, 23],
    questionIds: [
      1, 2, 3, 4
    ]
  },
]

// const questions = [
// ]

const selections = [
//start hard code LM
  {
    id: 1,
    content: "支払稟議",
    nextStep: [ 5, 6 ],
    type: 'question'
  },
  {
    id: 2,
    content: "契約稟議",
    nextStep: [9, 10],
    type: 'question'
  },
  {
    id: 3,
    content: "出張稟議",
    nextStep: [10],
    type: 'question'
  },
  {
    id: 4,
    content: "その他（交際費・会議費稟議)",
    nextStep: [11],
    type: 'question'
  },
  {
    content: "10万円以上100万円未満",
    id: 5,
    nextStep: [12, 13],
    type: 'question'
  },
  {
    content: "100万円以上",
    id: 6,
    nextStep: [14],
    type: 'question'
  },


  {
    content: "10万円以上100万円未満 12",
    id: 12,
    nextStep: [7, 9, 10],
    type: 'question',
  },
  {
    content: "100万円以上 13",
    id: 13,
    nextStep: [8],
    type: 'question',
  },
  {
    content: "100万円以上 14",
    id: 14,
    nextStep: [9],
    type: 'question',
  },


  {
    content: "【LM用】支払稟議書（10万円以上100万円未満）",
    id: 7,
    nextStep: [],
    url: "https://staging.give-greenlight.com/issues/create?workflowId=1983",
    type: 'answer'
  },
  {
    content: "【LM用】支払稟議書（100万円以上）",
    id: 8,
    nextStep: [],
    url: 'https://staging.give-greenlight.com/issues/create?workflowId=1989',
    type: 'answer'
  },
  {
    content: "【【LM用】契約稟議書",
    id: 9,
    nextStep: [],
    url: 'https://staging.give-greenlight.com/issues/create?workflowId=1992',
    type: 'answer'
  },
  {
    content: "【LM用】出張申請稟議書",
    id: 10,
    nextStep: [],
    url: 'https://staging.give-greenlight.com/issues/create?workflowId=1993',
    type: 'answer'
  },
  {
    content: "【【LM用】その他（交際費・会議費稟議）稟議書",
    id: 11,
    nextStep: [],
    url: 'https://staging.give-greenlight.com/issues/create?workflowId=1998',
    type: 'answer'
  },
//end hard code LM
]

const initQuestions = () => {
  const departmentInformation = departments.find(item => {
    return item.ids.includes(user.departmentId)
  })

  if (departmentInformation) {
    return departmentInformation.questionIds.map(item => {
      return selections.find(question => question.id == item)
    })
  }
  return null
}

onMounted(() => {
  const questions = initQuestions() as QuestionType[]
  if(questions) {
    containQuestions.value= [questions]
  }
})

const approvalDocuments = ref<[QuestionType[]]>([[]])
const containQuestions = ref<[QuestionType[]]>([[]])

const nextStep = (question?: QuestionType) => {
  const nextQuestions = selections.filter(item => question?.nextStep.includes(item.id))
  approvalDocuments.value = [[]]
  deleteQuestionOld(containQuestions.value, question) as [QuestionType[]]

  if (nextQuestions[0].type == 'answer') {
    approvalDocuments.value.push(nextQuestions)
  } else {
    containQuestions.value.push(nextQuestions)
  }
}

const deleteQuestionOld = (containQuestions: [QuestionType[]], questionClick?: QuestionType) => {
  const index = containQuestions.findIndex(questions => {
    return questions.some(question => question.id === questionClick?.id)
  })

  console.log('containQuestions', containQuestions)

  if(index == containQuestions.length - 1) return containQuestions
  return containQuestions.splice(index + 1)
}
</script>
<template>
  <div class="next-question">
    <div class="next" v-for="nextQuestions of containQuestions">
      <h1 class="item" v-for="question of nextQuestions" :key="question?.id" @click="nextStep(question)">
        {{
          question.content
        }}
      </h1>
    </div>
  </div>

  <div class="btn-redirect">
    <div class="list-btn" v-for="nextQuestions of approvalDocuments">
      <a class="item" v-for="question of nextQuestions" :key="question?.id" :href="question.url">
        {{
          question.content
        }}
      </a>
    </div>
  </div>
</template>

<style lang="scss">
.first-question {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-bottom: 50px;

  >.item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 500px;
    text-align: center;
    cursor: pointer;
  }
}

.next {
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid black;
  margin-bottom: 20px;

  >.item {
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 500px;
    text-align: center;
    cursor: pointer;
  }
}

.list-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  >.item {
    padding: 10 30px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
    width: 400px;
    text-align: center;
    cursor: pointer;
    background-color: purple;
    color: white;
  }
}
</style>
