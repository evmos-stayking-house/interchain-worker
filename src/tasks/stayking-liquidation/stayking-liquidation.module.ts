import {Module} from "@nestjs/common";
import {StaykingLiquidationService} from "./stayking-liquidation.service";

@Module({
  providers: [

    StaykingLiquidationService
  ],
  exports: [StaykingLiquidationService]
})
export class StaykingLiquidationModule {}
