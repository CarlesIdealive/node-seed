import { CronJob } from "cron";


type CronTime = string | Date;
type OnTick = () => void;       //Fuencion que no emite nada. Es el Callback que se ejecuta cada vez que se ejecuta el cron

export class CronAdapter {



    static createJob( cronTime : CronTime, onTick: OnTick ) : CronJob {

        var job = new CronJob(
            cronTime,
            onTick,
        );
        
        job.start();
        return job;
    }



}