default_platform(:ios)

platform :ios do
  desc "CI: build and upload to TestFlight"
  lane :ci_beta do
    # Temporary keychain on the runner
    create_keychain(
      name: "ci_keychain",
      default_keychain: true,
      unlock: true,
      timeout: 3600,
      lock_when_sleeps: false
    )

    # App Store Connect API key
    api_key = app_store_connect_api_key(
      key_id: ENV["ASC_KEY_ID"],
      issuer_id: ENV["ASC_ISSUER_ID"],
      key_content: ENV["ASC_API_KEY_P8"],
      is_key_content_base64: false,
      in_house: false
    )

    # Pull/create certs & profiles
    match(
      type: "appstore",
      readonly: false,
      git_url: ENV["MATCH_GIT_URL"],
      git_basic_authorization: ENV["MATCH_GIT_BASIC_AUTHORIZATION"],
      storage_mode: "git",
      app_identifier: [ENV["APP_IDENTIFIER"]],
      keychain_name: "ci_keychain",
      keychain_password: "",
      verbose: true
    )

    # >>> IMPORTANT: run build inside the ios/ folder <<<
    Dir.chdir("ios") do
      # If you didn't set IOS_SCHEME, try to infer from the .xcodeproj name; fallback to "VisionGram"
      inferred_scheme = Dir["*.xcodeproj"].map { |p| File.basename(p, ".xcodeproj") }.first
      scheme_name = ENV.fetch("IOS_SCHEME", inferred_scheme || "VisionGram")

      build_ios_app(
        workspace: Dir["*.xcworkspace"].first, # now relative to ios/
        scheme: scheme_name,
        configuration: "Release",
        export_method: "app-store",
        clean: true
      )
    end

    upload_to_app_store(
      api_key: api_key,
      skip_screenshots: true,
      skip_metadata: true,
      reject_if_possible: false,
      submit_for_review: false
    )
  ensure
    delete_keychain(name: "ci_keychain") rescue nil
  end
end
