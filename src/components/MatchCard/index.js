import './index.css'

const MatchCard = props => {
  const {recentMatchDetails} = props
  const {
    umpires,
    result,
    manOfTheMatch,
    id,
    date,
    venue,
    competingTeam,
    competingTeamLogo,
    firstInnings,
    secondInnings,
    matchStatus,
  } = recentMatchDetails

  const statsColor = matchStatus === 'Won' ? 'won-color' : 'lost-color'

  return (
    <li className="list-of-recent-match-container">
      <img
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
        className="logo-image"
      />
      <p className="heading">{competingTeam}</p>
      <p>{result}</p>
      <p className={`${statsColor}`}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
