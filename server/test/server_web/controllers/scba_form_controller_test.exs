defmodule ServerWeb.SCBAFormControllerTest do
  use ServerWeb.ConnCase

  import Server.FormsFixtures

  alias Server.Forms.SCBAForm

  @create_attrs %{
    complete: true,
    name: "some name",
    date: ~N[2024-05-04 19:18:00],
    clean: true,
    unit_number: 42,
    lights_working: true,
    bottle_full: true,
    straps_extended: true,
    damage: true
  }
  @update_attrs %{
    complete: false,
    name: "some updated name",
    date: ~N[2024-05-05 19:18:00],
    clean: false,
    unit_number: 43,
    lights_working: false,
    bottle_full: false,
    straps_extended: false,
    damage: false
  }
  @invalid_attrs %{complete: nil, name: nil, date: nil, clean: nil, unit_number: nil, lights_working: nil, bottle_full: nil, straps_extended: nil, damage: nil}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  describe "index" do
    test "lists all scba_forms", %{conn: conn} do
      conn = get(conn, ~p"/api/scba_forms")
      assert json_response(conn, 200)["data"] == []
    end
  end

  describe "create scba_form" do
    test "renders scba_form when data is valid", %{conn: conn} do
      conn = post(conn, ~p"/api/scba_forms", scba_form: @create_attrs)
      assert %{"id" => id} = json_response(conn, 201)["data"]

      conn = get(conn, ~p"/api/scba_forms/#{id}")

      assert %{
               "id" => ^id,
               "bottle_full" => true,
               "clean" => true,
               "complete" => true,
               "damage" => true,
               "date" => "2024-05-04T19:18:00",
               "lights_working" => true,
               "name" => "some name",
               "straps_extended" => true,
               "unit_number" => 42
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post(conn, ~p"/api/scba_forms", scba_form: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "update scba_form" do
    setup [:create_scba_form]

    test "renders scba_form when data is valid", %{conn: conn, scba_form: %SCBAForm{id: id} = scba_form} do
      conn = put(conn, ~p"/api/scba_forms/#{scba_form}", scba_form: @update_attrs)
      assert %{"id" => ^id} = json_response(conn, 200)["data"]

      conn = get(conn, ~p"/api/scba_forms/#{id}")

      assert %{
               "id" => ^id,
               "bottle_full" => false,
               "clean" => false,
               "complete" => false,
               "damage" => false,
               "date" => "2024-05-05T19:18:00",
               "lights_working" => false,
               "name" => "some updated name",
               "straps_extended" => false,
               "unit_number" => 43
             } = json_response(conn, 200)["data"]
    end

    test "renders errors when data is invalid", %{conn: conn, scba_form: scba_form} do
      conn = put(conn, ~p"/api/scba_forms/#{scba_form}", scba_form: @invalid_attrs)
      assert json_response(conn, 422)["errors"] != %{}
    end
  end

  describe "delete scba_form" do
    setup [:create_scba_form]

    test "deletes chosen scba_form", %{conn: conn, scba_form: scba_form} do
      conn = delete(conn, ~p"/api/scba_forms/#{scba_form}")
      assert response(conn, 204)

      assert_error_sent 404, fn ->
        get(conn, ~p"/api/scba_forms/#{scba_form}")
      end
    end
  end

  defp create_scba_form(_) do
    scba_form = scba_form_fixture()
    %{scba_form: scba_form}
  end
end
