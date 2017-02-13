import java.io.IOException;
import java.text.MessageFormat;

import org.eclipse.egit.github.core.Contributor;
import org.eclipse.egit.github.core.Repository;
import org.eclipse.egit.github.core.service.RepositoryService;

public class GitApiSample {
        public static void main(String[] args) throws IOException {
            if (args.length == 1) {
                final String user = args[0];

                String formatStr = "%3s) %15s - created on %10s, issues %2s, updated %s15";

                int count = 1;
                RepositoryService service = new RepositoryService();
                for (Repository repo : service.getRepositories(user)) {

                    System.out.println(String.format(formatStr, count++,
                            repo.getName(), repo.getCreatedAt(), repo.getOpenIssues(),
                            repo.getUpdatedAt().toString()));

                }
            }
        }
}
