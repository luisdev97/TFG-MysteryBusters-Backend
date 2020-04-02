import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';



const anomaliesDefinitionsFactory = new GraphQLDefinitionsFactory();
anomaliesDefinitionsFactory.generate({
  typePaths: ['./src/**/*.graphql'],
  path: join(process.cwd(), 'src/schema.graphql.ts'),
});
