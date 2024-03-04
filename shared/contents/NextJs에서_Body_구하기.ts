import { Content } from '@shared/contents'
import { createUrl } from '@shared/function'

export const NextJs에서_Body_구하기: Content = {
  title: 'Next.js 에서 Body 구하기',
  createdAt: '2024-03-04',
  url: createUrl('Next.js 에서 Body 구하기'),
  content: `## ❓ 문제를 풀어야 했던 이유
서비스 개발 중 **NICE 본인인증**을 \`Next.js\` 에서 해결하는 중에 문제가 발생했다.

<br />

NICE 인증 Flow 는 아래와 같은데
- 암호화 데이터 요청 - \`Client Side\`
- 암호화 데이터 발급 - \`Server Side [API]\`
- 암호화 데이터를 기반으로 NICE 본인인증 페이지 호출 - \`Client Side\`
- 인증 성공 시 성공 데이터를 암호화하여 요청 서버 **Return URL** 에 포함하여 이동 - \`NICE\`
	- PC 환경이라면 GET 메소드를 사용하기 때문에 암호화 데이터가 \`ctx.query\` 에 존재함
	- ⚠️ 모바일 환경이라면 POST 메소드를 사용하기 때문에 암호화 데이터가 \`body\` 에 존재함
- 암호화 된 성공 데이터를 복호화하여 사용 - \`Server Side\`

<br />

이 때 모바일 환경이 문제다. <br />
\`getServerSideProps\` 에 \`ctx\` 에는 \`body\` 값이 존재하지 않았기 때문에 \`body\` 값을 생성할 필요가 있었다.

<br />

**Return URL** 을 \`next api\` 페이지로 설정하여 \`req.body\` 를 사용하여 별도 처리 페이지에 <br />
**redirect** 시킬 수 있지만 이보단 더욱 우아하게 하나의 **Return URL** 페이지에서 하나의 문제를 해결하고 싶어서  이 문제를 만들었다.

## 💡 해결 방법
\`body-parser\` 를 사용하여 문제를 해결하였다.

##### 설치

\`\`\`bash
yarn add @types/body-parser body-parser
\`\`\`

위 명령문으로 \`body-parser\`를 설치한다.

<br />

##### 적용

\`\`\`typescript
import bodyParser from "body-parser";
import util from "util";

const getBody = util.promisify(bodyParser.urlencoded());
\`\`\`

위 코드로 \`getBody\` 함수를 생성하고

<br />

\`\`\`typescript
type NiceResponse = {
	EncodeData: string;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	let sEncData = "";

	if (ctx.req.method === "POST") {
		await getBody(ctx.req, ctx.res);
		sEncData = ((ctx.req as any).body as NiceResponse).EncodeData;
	} else {
		sEncData = (ctx.query as NiceResponse).EncodeData;
	}
}
\`\`\`

\`getServerSideProps\` 에서 \`await getBody(ctx.req, ctx.res)\`를 사용하여
\`ctx.req\` 에 \`body\` 값을 추가해주었다.
    `,
  description: 'body-parser 로 Next.js 에서 body 구하는 방법',
  coverUrl: '/assets/get-body-in-next-js/cover.webp',
  categorys: ['React', 'Next.js', 'Next', 'body', 'body-parser'],
}
