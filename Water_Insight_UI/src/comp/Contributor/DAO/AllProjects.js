import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getProjects } from '../../../actions/dao';
import useAuthStore from '../../../store/auth';
import Card from "./Card";

function AllProjects({ role }) {
  const currentWalletId = useAuthStore(s => s.userDetails.walletId)
  const queryClient = useQueryClient()
  const { isLoading, data } = useQuery({
    queryFn: getProjects,
    queryKey: ["projects"],
  })

  const refresh = () => {
    queryClient.invalidateQueries(["projects"])
  }

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

export default AllProjects