import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addFeatures,
  addPackageJsonDependenciesForLibrary,
  analyzeApplication,
  analyzeCrossFeatureDependencies,
  finalizeInstallation,
  readPackageJson,
  SpartacusContentfulPreviewOptions,
  validateSpartacusInstallation,
} from '@spartacus/schematics';
import { peerDependencies } from '../../package.json';

export function addContentfulPreviewFeatures(
  options: SpartacusContentfulPreviewOptions
): Rule {
  return (tree: Tree, _context: SchematicContext): Rule => {
    const packageJson = readPackageJson(tree);
    validateSpartacusInstallation(packageJson);

    const features = analyzeCrossFeatureDependencies(
      options.features as string[]
    );

    return chain([
      analyzeApplication(options, features),

      addFeatures(options, features),
      addPackageJsonDependenciesForLibrary(peerDependencies, options),

      finalizeInstallation(options, features),
    ]);
  };
}
