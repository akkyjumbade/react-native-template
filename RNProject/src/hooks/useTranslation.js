import { useTranslation as useBaseTranslation } from 'react-i18next'

export default function useTranslation() {
   const { t } = useBaseTranslation()
   return t
}
