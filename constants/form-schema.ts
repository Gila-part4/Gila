export const registerFields = [
  { name: 'nickname', label: '닉네임', placeholder: '닉네임을 입력해 주세요', type: 'text' },
  { name: 'email', label: '이메일', placeholder: '이메일을 입력해 주세요', type: 'text' },
  {
    name: 'emailCheck',
    label: '인증번호입력',
    placeholder: '인증번호를 입력해 주세요',
    type: 'text',
  },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
  },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    placeholder: '비밀번호를 한 번 더 입력해 주세요',
    type: 'password',
  },
];

export const loginFields = [
  { name: 'email', label: '이메일', placeholder: '이메일을 입력해 주세요', type: 'text' },
  {
    name: 'password',
    label: '비밀번호',
    placeholder: '비밀번호를 입력해 주세요',
    type: 'password',
  },
];

export const EditFormFields = {
  name: 'content',
  label: '수정하기',
  placeholder: '답변을 입력해 주세요',
  type: 'textarea',
};

export const AnswerFormFields = {
  name: 'content',
  label: '답변하기',
  placeholder: '답변을 입력해 주세요',
  type: 'textarea',
};

export const QuestionFormFields = [
  {
    name: 'location',
    label: '장소',
    placeholder: '장소를 입력해 주세요',
    type: 'text',
  },
  {
    name: 'title',
    label: '제목',
    placeholder: '제목을 입력해 주세요',
    type: 'text',
  },
  {
    name: 'content',
    label: '내용',
    placeholder: '내용을 입력해 주세요',
    type: 'textarea',
  },
];
