import { css, useTheme } from '@emotion/react'
import { opacity, staticColor } from '@styles/palette'
import transition from '@styles/transition'
import { useState } from 'react'
import Flex from './layout/Flex'
import Spacing from './layout/Spacing'

export interface LinkInputSubmitParam {
  name: string
  href: string
}

interface Props {
  onSubmit?: (form: LinkInputSubmitParam) => void
}

function LinkInput({ onSubmit }: Props) {
  const { color } = useTheme()

  const [form, setForm] = useState<LinkInputSubmitParam>({
    name: '',
    href: '',
  })

  const style = {
    box: css`
      position: absolute;
      left: 0;
      top: calc(100% + 8px);
      border-radius: 8px;
      padding: 12px 16px;
      background-color: ${color.text_100};
    `,
    title: css`
      font-size: 1.25rem;
      color: ${color.text_900};
      white-space: nowrap;
    `,
    description: css`
      font-size: 0.95rem;
      color: ${color.text_500};
      white-space: nowrap;
    `,
    input: css`
      width: 300px;
      border-bottom: 1px solid ${color.text_600};
      transition: ${transition.fast};
      padding: 8px 0;

      &:focus {
        border-bottom-color: ${color.text_900};
      }
    `,
    button: css`
      width: 64px;
      height: 32px;
      line-height: 32px;
      border-radius: 16px;
      text-align: center;
      align-self: flex-end;
      color: ${color.text_900};
      background-color: ${staticColor.primary_900};
      transition: ${transition.fast};
      cursor: pointer;

      &:disabled {
        background-color: ${opacity({
          color: staticColor.primary_800,
          opacity: 0.4,
        })};
      }
    `,
  }

  const disabled = form.href.trim().length === 0

  function onClickButton() {
    if (onSubmit) onSubmit(form)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = e.target

    setForm({
      ...form,
      [id]: value,
    })
  }

  return (
    <Flex column css={style.box}>
      <p css={style.title}>링크 입력</p>
      <Spacing size='1rem' />
      <p css={style.description}>
        링크 텍스트 미입력 시 링크로 자동 입력됩니다.
      </p>
      <Spacing size='1rem' />
      <input
        id='name'
        type='text'
        css={style.input}
        value={form.name}
        onChange={onChange}
        placeholder='링크 텍스트'
      />
      <Spacing size='0.75rem' />
      <input
        id='href'
        type='text'
        css={style.input}
        value={form.href}
        onChange={onChange}
        placeholder='링크'
      />
      <Spacing size='1.25rem' />
      <button
        type='button'
        css={style.button}
        disabled={disabled}
        onClick={onClickButton}
      >
        확인
      </button>
    </Flex>
  )
}

export default LinkInput
