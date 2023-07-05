import {
  // config
  ConfigurationParameters,
  // apis
  DebugApi,
  DebugPayload,
  // requests
  DebugPromptRequest,
  DebugPromptResponse,
  FilePayload,
} from "sdk-ts";
import "dotenv/config";

const host =
  process.env.XRPLD_AI_HOST === "http://localhost"
    ? `${process.env.XRPLD_AI_HOST}:${process.env.XRPLD_AI_PORT}`
    : process.env.XRPLD_AI_HOST;
const basePath = `${host}/${process.env.XRPLD_AI_VERSION}`;

/* Service  ==================================================================== */
class ApiService {
  /* Degub Bot  ================================================================= */
  async debugPrompt(
    files: FilePayload[],
    error: string,
    prompt: string,
    modelName: string
  ): Promise<DebugPromptResponse> {
    try {
      const configuration: ConfigurationParameters = {
        basePath: basePath,
      };
      const apiSerivice = new DebugApi(configuration);
      const payload: DebugPayload = {
        files: files,
        error: error,
      };
      const body: DebugPromptRequest = {
        payload,
        prompt,
        modelName,
      };
      return (await apiSerivice.debugPrompt(body)).data;
    } catch (error: any) {
      console.log(error);
      throw error;
    }
  }
}

export default new ApiService();
