import config from "~/config";
import storage, { bucket } from "~/storage";
import type { Config } from "~/config";
import type { Storage } from "~/storage";

class AvatarRepository {
  private readonly basePath = "public/avatars";

  constructor(
    private readonly storage: Storage,
    private readonly bucket: string,
    private readonly config: Config,
  ) {}

  public async upsert(params: {
    where: { userId: string };
    data: { file: File };
  }) {
    const path = `${this.basePath}/${params.where.userId}.jpg`;
    const buffer = Buffer.from(await params.data.file.arrayBuffer());

    await this.storage.putObject(this.bucket, path, buffer);
    return `${this.config.MINIO_URL}/${this.bucket}/${path}`;
  }
}

const avatarRepository = new AvatarRepository(storage, bucket, config);
export default avatarRepository;
