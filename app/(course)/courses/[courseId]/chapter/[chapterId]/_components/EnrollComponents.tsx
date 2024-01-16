import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import CourseEnrollButton from './CourseEnrollButton';

interface EnrollComponentsProps {
  courseId: string;
  access: boolean;
}

export default function EnrollComponents({
  access,
  courseId,
}: EnrollComponentsProps) {
  return (
    <Card className="bg-gradient-to-tr from-cyan-700 via-sky-900 to-blue-900">
      <CardHeader className="text-white">
        <CardTitle className="text-2xl font-semibold mb-2">
          Ready to become a real dev?
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-xl text-white font-medium">
          Buy this course be cool , and make Eli rich as fuck
        </CardDescription>
      </CardContent>

      <CardFooter className="w-full">
        {access || (
          <CourseEnrollButton
            className="text-lg py-6 font-bold w-full "
            price={1234}
            courseId={courseId}
          />
        )}
      </CardFooter>
    </Card>
  );
}
