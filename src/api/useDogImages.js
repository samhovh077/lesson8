
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import useGameStore from '../store/useGameStore'

const fetchDogs = async ({ queryKey }) => {
  const [, level] = queryKey
  const res = await axios.get(`https://dog.ceo/api/breeds/image/random/${level}`)
  return res.data.message
}


export const useDogImages = (level) => {

  const { enabled } = useGameStore()

  return useQuery({
    queryKey: ['dogs', level],
    queryFn: fetchDogs,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled,
  })
}
