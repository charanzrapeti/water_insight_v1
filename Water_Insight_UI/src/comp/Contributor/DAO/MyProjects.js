import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getMyProjects } from '../../../actions/dao';
import useAuthStore from '../../../store/auth';
import Card from "./Card";

function MyProjects({ role }) {
  const currentWalletId = useAuthStore(s => s.userDetails.walletId)
  const queryClient = useQueryClient()
  const { isLoading, data } = useQuery({
    queryFn: getMyProjects,
    queryKey: ["my-projects"],
  })

  const refresh = () => {
    queryClient.invalidateQueries(["my-projects"])
  }

  console.log(data)
  return !isLoading && data.projectList.map(a => (
    <Card
      {...a}
      key={a._id}
      role={role}
      refresh={refresh}
      isMine={a.walletId === currentWalletId}
    />
  ))
}

export default MyProjects