import {Component} from 'react'
import './index.css'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrls: '',
    matchDetailsLatest: '',
    matchDetailsRecent: [],
    colorId: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getRecentlyPlayedMatches()
  }

  getRecentlyPlayedMatches = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()
    const teamBannerUrl = data.team_banner_url
    const latestMatchDetails = data.latest_match_details
    const recentMatches = data.recent_matches
    const updateLatestMatchDetails = {
      umpires: latestMatchDetails.umpires,
      result: latestMatchDetails.result,
      manOfTheMatch: latestMatchDetails.man_of_the_match,
      id: latestMatchDetails.id,
      date: latestMatchDetails.date,
      venue: latestMatchDetails.venue,
      competingTeam: latestMatchDetails.competing_team,
      competingTeamLogo: latestMatchDetails.competing_team_logo,
      firstInnings: latestMatchDetails.first_innings,
      secondInnings: latestMatchDetails.second_innings,
      matchStatus: latestMatchDetails.match_status,
    }
    const updateRecentMatches = recentMatches.map(eachMatches => ({
      umpires: eachMatches.umpires,
      result: eachMatches.result,
      manOfTheMatch: eachMatches.man_of_the_match,
      id: eachMatches.id,
      date: eachMatches.date,
      venue: eachMatches.venue,
      competingTeam: eachMatches.competing_team,
      competingTeamLogo: eachMatches.competing_team_logo,
      firstInnings: eachMatches.first_innings,
      secondInnings: eachMatches.second_innings,
      matchStatus: eachMatches.match_status,
    }))

    this.setState({
      colorId: id,
      teamBannerUrls: teamBannerUrl,
      matchDetailsLatest: updateLatestMatchDetails,
      matchDetailsRecent: updateRecentMatches,
      isLoading: false,
    })
  }

  render() {
    const {
      teamBannerUrls,
      matchDetailsLatest,
      matchDetailsRecent,
      colorId,
      isLoading,
    } = this.state
    return isLoading ? (
      <div testid="loader" className="loader-spinner">
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    ) : (
      <div className={`team-match-container ${colorId}-color`}>
        <img
          src={teamBannerUrls}
          className="team-banner-image"
          alt="team banner"
        />
        <h1 className="latest-match">Latest Matches</h1>
        <LatestMatch
          latestMatch={matchDetailsLatest}
          key={matchDetailsLatest.id}
        />
        <ul className="recent-match-unorder-contianer">
          {matchDetailsRecent.map(eachMatches => (
            <MatchCard recentMatchDetails={eachMatches} key={eachMatches.id} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
