import { DayReportService } from "../../service/DayReportService.js";
import { GoalMetricService } from "../../service/GoalMetricService.js";
import { GoalService } from "../../service/GoalService.js";
import { UserService } from "../../service/UserService.js";
import { WayService } from "../../service/WayService.js";
import { logToFile } from "../../utils/logToFile.js";

const LOG_FILE = "clearAllCollections.log";
const log = (textToLog: string) => logToFile(`${(new Date()).toISOString()}: ${textToLog}`, LOG_FILE);

export const clearAllCollections = async () => {
  const clearAllCollectionsStartTime = new Date();

  log(`Getting Users collection`)
  const allUsers = await UserService.getUsersDTO();
  log(`Got ${allUsers.length} users`)
  log(`Required ${allUsers.length} READ operations`)

  log(`Getting Ways collection`)
  const allWays = await WayService.getWaysDTO();
  log(`Got ${allWays.length} ways`)
  log(`Required ${allWays.length} READ operations`)

  log(`Getting DayReports collection`)
  const allDayReports = await DayReportService.getDayReportsDTO();
  log(`Got ${allDayReports.length} dayReports`)
  log(`Required ${allDayReports.length} READ operations`)

  log(`Getting Goals collection`)
  const allGoals = await GoalService.getGoalsDTO();
  log(`Got ${allGoals.length} goals`)
  log(`Required ${allGoals.length} READ operations`)

  log(`Getting GoalMetrics collection`)
  const allGoalMetrics = await GoalMetricService.getGoalMetricsDTO();
  log(`Got ${allGoalMetrics.length} goalMetrics`)
  log(`Required ${allGoalMetrics.length} READ operations`)

  const totalReadOperationsAmount = allUsers.length + allWays.length + allDayReports.length + allGoals.length + allGoalMetrics.length;

  log(`Deleting documents in collections`)
  const deleteUsersPromise = allUsers.map(user => user.uuid).map(UserService.deleteUserDTO);
  const deleteWaysPromise = allWays.map(way => way.uuid).map(WayService.deleteWayDTO);
  const deleteDayReportsPromise = allDayReports.map(report => report.uuid).map(DayReportService.deleteDayReportDTO);
  const deleteGoalsPromise = allGoals.map(goal => goal.uuid).map(GoalService.deleteGoalDTO);
  const deleteGoalMetricsPromise = allGoalMetrics.map(goalMetric => goalMetric.uuid).map(GoalMetricService.deleteGoalMetricsDTO);

  const { length: deletedAmount } = await Promise.all([
    ...deleteUsersPromise,
    ...deleteWaysPromise,
    ...deleteDayReportsPromise,
    ...deleteGoalsPromise,
    ...deleteGoalMetricsPromise,
  ])
  log(`Deleting documents in collections finished`)

  const clearAllCollectionsEndTime = new Date();
  const clearAllCollectionsTime = clearAllCollectionsEndTime.getTime() - clearAllCollectionsStartTime.getTime();

  log(`
  Start time: ${clearAllCollectionsStartTime}
  End time: ${clearAllCollectionsEndTime}
  Total time: ${clearAllCollectionsTime} ms

  Total READ operations amount: ${totalReadOperationsAmount}
  Total Documents to deleted: ${deletedAmount}
`)

};
