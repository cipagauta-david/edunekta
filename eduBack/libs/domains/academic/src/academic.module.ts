import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Aula } from './entities/aula.entity';
import { ClassroomsController } from './infrastructure/controllers/classrooms.controller';
import { ClassroomsService } from './infrastructure/services/classrooms.service';
import { NivelAcademico } from './entities/nivel-academico.entity';
import { Grado } from './entities/grado.entity';
import { Grupo } from './entities/grupo.entity';
import { Asignatura } from './entities/asignatura.entity';
import { PeriodoAcademico } from './entities/periodo-academico.entity';
import { Clase } from './entities/clase.entity';
import { Matricula } from './entities/matricula.entity';
import { Actividad } from './entities/actividad.entity';
import { EvidenciaActividad } from './entities/evidencia-actividad.entity';
import { Asistencia } from './entities/asistencia.entity';
import { PonderacionEvaluacion } from './entities/ponderacion-evaluacion.entity';
import { CalificacionPeriodo } from './entities/calificacion-periodo.entity';
import { AcademicLevelsController } from './infrastructure/controllers/academic-levels.controller';
import { AcademicLevelsService } from './infrastructure/services/academic-levels.service';
import { GradesController } from './infrastructure/controllers/grades.controller';
import { GradesService } from './infrastructure/services/grades.service';
import { SubjectsController } from './infrastructure/controllers/subjects.controller';
import { SubjectsService } from './infrastructure/services/subjects.service';
import { AcademicPeriodsController } from './infrastructure/controllers/academic-periods.controller';
import { AcademicPeriodsService } from './infrastructure/services/academic-periods.service';
import { GroupsController } from './infrastructure/controllers/groups.controller';
import { GroupsService } from './infrastructure/services/groups.service';
import { ClassesController } from './infrastructure/controllers/classes.controller';
import { ClassesService } from './infrastructure/services/classes.service';
import { EnrollmentsController } from './infrastructure/controllers/enrollments.controller';
import { EnrollmentsService } from './infrastructure/services/enrollments.service';
import { ActivitiesController } from './infrastructure/controllers/activities.controller';
import { ActivitiesService } from './infrastructure/services/activities.service';
import { ActivityEvidencesController } from './infrastructure/controllers/activity-evidences.controller';
import { ActivityEvidencesService } from './infrastructure/services/activity-evidences.service';
import { AttendanceController } from './infrastructure/controllers/attendance.controller';
import { AttendanceService } from './infrastructure/services/attendance.service';
import { EvaluationWeightsController } from './infrastructure/controllers/evaluation-weights.controller';
import { EvaluationWeightsService } from './infrastructure/services/evaluation-weights.service';
import { TermGradesController } from './infrastructure/controllers/term-grades.controller';
import { TermGradesService } from './infrastructure/services/term-grades.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Aula,
      NivelAcademico,
      Grado,
      Grupo,
      Asignatura,
      PeriodoAcademico,
      Clase,
      Matricula,
      Actividad,
      EvidenciaActividad,
      Asistencia,
      PonderacionEvaluacion,
      CalificacionPeriodo,
    ]),
  ],
  controllers: [
    ClassroomsController,
    AcademicLevelsController,
    GradesController,
    SubjectsController,
    AcademicPeriodsController,
    GroupsController,
    ClassesController,
    EnrollmentsController,
    ActivitiesController,
    ActivityEvidencesController,
    AttendanceController,
    EvaluationWeightsController,
    TermGradesController,
  ],
  providers: [
    ClassroomsService,
    AcademicLevelsService,
    GradesService,
    SubjectsService,
    AcademicPeriodsService,
    GroupsService,
    ClassesService,
    EnrollmentsService,
    ActivitiesService,
    ActivityEvidencesService,
    AttendanceService,
    EvaluationWeightsService,
    TermGradesService,
  ],
  exports: [
    ClassroomsService,
    AcademicLevelsService,
    GradesService,
    SubjectsService,
    AcademicPeriodsService,
    GroupsService,
    ClassesService,
    EnrollmentsService,
    ActivitiesService,
    ActivityEvidencesService,
    AttendanceService,
    EvaluationWeightsService,
    TermGradesService,
  ],
})
export class AcademicModule {}
