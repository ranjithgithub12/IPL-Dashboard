import './index.css'
import {Link} from 'react-router-dom'

const TeamCard = props => {
  const {listOfTeamCard} = props
  const {id, name, teamImageUrl} = listOfTeamCard

  return (
    <Link to={`/team-matches/${id}`} className="link-item">
      <li className="list-of-ipl-teams">
        <img src={teamImageUrl} alt={name} className="team-logo-image" />
        <p className="team-name">{name}</p>
      </li>
    </Link>
  )
}

export default TeamCard
