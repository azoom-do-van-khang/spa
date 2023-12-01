export const TYPE_SELECTIONS = {
	question: 'question',
	answer: 'answer'
}

export const DEPARTMENTS = [
	{
		ids: [2, 21, 22, 23],
		questionIds: [
			1, 2, 3, 4
		]
	},
]

export const SELECTION_QUESTIONS = [
	//start hard code LM
	{
		id: 1,
		content: "支払稟議",
		nextStep: [5, 6],
		type: TYPE_SELECTIONS.question
	},
	{
		id: 2,
		content: "契約稟議",
		nextStep: [9, 10],
		type: TYPE_SELECTIONS.question
	},
	{
		id: 3,
		content: "出張稟議",
		nextStep: [10],
		type: TYPE_SELECTIONS.question
	},
	{
		id: 4,
		content: "その他（交際費・会議費稟議)",
		nextStep: [11],
		type: TYPE_SELECTIONS.question
	},
	{
		content: "10万円以上100万円未満",
		id: 5,
		nextStep: [7],
		type: TYPE_SELECTIONS.question
	},
	{
		content: "100万円以上",
		id: 6,
		nextStep: [8],
		type: TYPE_SELECTIONS.question
	},
	{
		content: "【LM用】支払稟議書（10万円以上100万円未満）",
		id: 7,
		nextStep: [],
		url: "https://staging.give-greenlight.com/issues/create?workflowId=1983",
		type: TYPE_SELECTIONS.answer
	},
	{
		content: "【LM用】支払稟議書（100万円以上）",
		id: 8,
		nextStep: [],
		url: 'https://staging.give-greenlight.com/issues/create?workflowId=1989',
		type: TYPE_SELECTIONS.answer
	},
	{
		content: "【【LM用】契約稟議書",
		id: 9,
		nextStep: [],
		url: 'https://staging.give-greenlight.com/issues/create?workflowId=1992',
		type: TYPE_SELECTIONS.answer
	},
	{
		content: "【LM用】出張申請稟議書",
		id: 10,
		nextStep: [],
		url: 'https://staging.give-greenlight.com/issues/create?workflowId=1993',
		type: TYPE_SELECTIONS.answer
	},
	{
		content: "【【LM用】その他（交際費・会議費稟議）稟議書",
		id: 11,
		nextStep: [],
		url: 'https://staging.give-greenlight.com/issues/create?workflowId=1998',
		type: TYPE_SELECTIONS.answer
	},
	//end hard code LM
]
