<script setup lang="ts">
import {
  DEPARTMENTS,
  TYPE_SELECTIONS,
  SELECTION_QUESTIONS
} from "@/utils"

const user = {
  departmentId: 2
}

interface QuestionType {
  id: number,
  content: string,
  nextStep: number[]
  type: string,
  url?: string,
  active: boolean
}

const TITLE_QUESTIONS = [
	'申請したい稟議書を選んでください。',
	'申請する金額はいくらですか？'
]

const initQuestions = () => {
  const departmentInformation = DEPARTMENTS.find(department => {
    return department.ids.includes(user.departmentId)
  })

  if (departmentInformation) {
    return departmentInformation.questionIds.map(item => {
      return {
        ...SELECTION_QUESTIONS.find(question => question.id == item),
        active: false
      }
    })
  }
  return null
}

const isShowQuestions = ref(false)
onMounted(() => {
  const questions = initQuestions() as QuestionType[]
  if (questions) {
    containQuestions.value = [questions]
  }
  isShowQuestions.value = true
})

const approvalDocuments = ref<[QuestionType[]]>([[]])
const containQuestions = ref<[QuestionType[]]>([[]])
const promptChooseApprovalDocument = ref(false)

const clickNextQuestion = (question?: QuestionType) => {
  approvalDocuments.value = [[]]

  const nextQuestions =
    SELECTION_QUESTIONS
      .filter(item => question?.nextStep.includes(item.id))
      .map(item => {
        return {
          ...item,
          active: false
        }
      })

  containQuestions.value = backToIndexQuestionClicked(containQuestions.value, question) as [QuestionType[]]

  if (nextQuestions[0].type == TYPE_SELECTIONS.answer) {
    promptChooseApprovalDocument.value = true
    approvalDocuments.value.push(nextQuestions)
  } else {
    promptChooseApprovalDocument.value = false
    containQuestions.value.push(nextQuestions)
  }
}

const backToIndexQuestionClicked = (containQuestions: [QuestionType[]], questionClick?: QuestionType) => {
  const index = containQuestions.findIndex(questions => {
    return questions.some(question => question.id === questionClick?.id)
  })

  if (index == containQuestions.length - 1) return triggerActiveQuestionClicked(containQuestions, questionClick, index)

  return triggerActiveQuestionClicked(
    containQuestions.splice(0, index + 1) as [QuestionType[]],
    questionClick,
    index
  )
}

const triggerActiveQuestionClicked = (containQuestions: [QuestionType[]], questionClick?: QuestionType, indexClick?: number) => {
  return containQuestions.map((questions, index) => {
    if(index != indexClick) return questions
    return questions.map(question => {
      if(question.id === questionClick?.id) return {
        ...question,
        active: true
      }
      return {
        ...question,
        active: false
      }
    })
  })
}

</script>
<template>
  <div class="container">
    <span class="header">稟議申請書選択フォーム</span>
    <span class="title">リーシングマネジメント1部　田中太郎さん</span>
    <div
      v-if="isShowQuestions"
      class="questions"
      v-for="(nextQuestions, index) of containQuestions"
    >
      <span class="title">{{ TITLE_QUESTIONS[index] }}</span>
      <p
        v-for="question of nextQuestions"
        :key="question?.id"
        class="question"
        :class="{ '-active': question.active }"
        @click="clickNextQuestion(question)"
      >
        {{
          question.content
        }}
      </p>
    </div>
    <span class="prompt" v-if="promptChooseApprovalDocument">この稟議書を使用してください</span>
    <div class="buttons" v-for="nextQuestions of approvalDocuments">
      <a class="button" v-for="question of nextQuestions" :key="question?.id" :href="question.url">
        {{
          question.content
        }}
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
}

.container {
  background-color: #F5F6F7;
  height: 100vh;
  padding: 0 20%;
  > .header {
    display: block;
    text-align: center;
    font-weight: 700;
    font-size: 1.5rem;
    padding: 60px 0 40px 0;
  }
  > .title {
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    margin-bottom: 18px;
  }
  > .prompt {
    display: block;
    text-align: center;
    font-size: 1rem;
    font-weight: 700;
    height: 24px;
    line-height: 24px;
    margin-top: 40px;
  }
}

.questions {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  margin-bottom: 20px;
  background-color: white;
  transition: transform .1s ease-in-out, opacity .1s ease-in-out;
  animation: anim .1s ease-in-out;
  > .title {
    font-weight: 700;
    font-size: 1rem;
    margin-top: 40px;
    margin-bottom: 5px;
    height: 24px;
    line-height: 24px;
  }

  > .question {
    margin-bottom: 10px;
    border: 1px solid #DDDDDD;
    border-radius: 30px;
    width: 60%;
    text-align: center;
    cursor: pointer;
    font-weight: 400;
    font-size: 0.875rem;
    height: 38px;
    line-height: 38px;
  }

  > .-active {
    border: 1px solid #6200EE;
    color: #6200EE;
    background-color: #6200ee05;
  }
}

.buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
  transition: transform .1s ease-in-out, opacity .1s ease-in-out;
  animation: anim .1s ease-in-out;
  > .button {
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;
    background-color: #6200EE;
    color: white;
    text-decoration: none;
    font-size: 1rem;
    width: 60%;
    height: 56px;
    line-height: 56px;
    border-radius: 4px;
  }
}

@keyframes anim {
  0% {
    display: none;
    opacity: 0;
  }
  1% {
    display: block;
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
