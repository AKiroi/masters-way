import {collection, doc, getDoc, getDocs, updateDoc} from "firebase/firestore";
import {db} from "src/firebase";
import {PlanForNextPeriodDTO} from "src/model/firebaseCollection/PlanForNextPeriodDTO";
import {documentSnapshotToDTOConverter} from "src/service/converter/documentSnapshotToDTOConverter";
import {querySnapshotToDTOConverter} from "src/service/converter/querySnapshotToDTOConverter";

const PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION = "plansForNextPeriod";

/**
 * Provides methods to interact with the PlansForNextPeriod collection
 */
export class PlanForNextPeriodService {

  /**
   * Get PlansForNextPeriodDTO
   */
  public static async getPlansForNextPeriodDTO(): Promise<PlanForNextPeriodDTO[]> {
    const plansForNextPeriodRaw = await getDocs(collection(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION));
    const plansForNextPeriod: PlanForNextPeriodDTO[] = querySnapshotToDTOConverter<PlanForNextPeriodDTO>(plansForNextPeriodRaw);

    return plansForNextPeriod;
  }

  /**
   * Get PlanForNextPeriodDTO by Uuid
   */
  public static async getPlanForNextPeriodDTO(uuid: string): Promise<PlanForNextPeriodDTO> {
    const planForNextPeriodRaw = await getDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid));
    const planForNextPeriod: PlanForNextPeriodDTO = documentSnapshotToDTOConverter<PlanForNextPeriodDTO>(planForNextPeriodRaw);

    return planForNextPeriod;
  }

  /**
   * Update PlanForNextPeriodDTO
   */
  public static async updatePLanForNextPeriodDTO(data: PlanForNextPeriodDTO, uuid: string) {
    await updateDoc(doc(db, PATH_TO_PLANS_FOR_NEXT_PERIOD_COLLECTION, uuid), {...data});
  }

}