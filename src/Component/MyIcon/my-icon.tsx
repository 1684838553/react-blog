import { createFromIconfontCN } from '@ant-design/icons';

export default function MyIcon(url: string) {
    return createFromIconfontCN({
        scriptUrl: url
    })
}
