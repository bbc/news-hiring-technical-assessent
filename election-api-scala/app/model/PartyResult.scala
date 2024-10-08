package model

case class PartyResult(party: String, votes: Int, share: BigDecimal)
case class ConstituencyResult(id: Int, name: String, seqNo: Int, partyResults: Seq[PartyResult])

case class ApiResponse (error: String, message: String)

// TODO:
// implement this in any way you wish
case class Scoreboard(winner: String)